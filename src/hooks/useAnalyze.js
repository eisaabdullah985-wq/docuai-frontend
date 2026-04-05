import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { analyzeDocument } from '../api/analyzeApi';
import { fileToBase64, detectFileType } from '../utils/fileUtils';

export function useAnalyze() {
  const [result,   setResult]   = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);
  const [history,  setHistory]  = useState([]);   // last 5 results

  const analyze = useCallback(async (file, apiKey) => {
    if (!file)   return toast.error('No file selected');
    if (!apiKey) return toast.error('API key is required');

    const fileType = detectFileType(file);
    if (!fileType) {
      return toast.error('Unsupported file type. Use PDF, DOCX, or an image.');
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const fileBase64 = await fileToBase64(file);

      const data = await analyzeDocument({
        fileName:  file.name,
        fileType,
        fileBase64,
        apiKey,
      });

      setResult(data);
      setHistory((prev) => [data, ...prev].slice(0, 5));
      toast.success('Analysis complete!');
      return data;
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Something went wrong';

      const status = err.response?.status;
      if (status === 401) toast.error('Invalid API key — check your x-api-key');
      else if (status === 422) toast.error('Could not extract text from this file');
      else if (status === 429) toast.error('Rate limit hit — slow down a sec');
      else toast.error(msg);

      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, loading, error, history, analyze, reset };
}