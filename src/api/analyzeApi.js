import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export async function analyzeDocument({ fileName, fileType, fileBase64, apiKey }) {
  const { data } = await axios.post(
    `${BASE_URL}/document-analyze`,
    { fileName, fileType, fileBase64 },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      timeout: 120000,
    }
  );
  return data;
}