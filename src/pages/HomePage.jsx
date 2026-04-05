import { useState } from 'react';
import DropZone    from '../components/uploads/DropZone';
import ApiKeyInput from '../components/uploads/ApiKeyInput';
import ResultCard  from '../components/results/ResultCard';
import Spinner     from '../components/ui/Spinner';
import { useAnalyze } from '../hooks/useAnalyze';

const PROCESSING_STEPS = [
  { label: 'Reading file…',       icon: '📖' },
  { label: 'Extracting text…',    icon: '🔤' },
  { label: 'Running AI analysis…',icon: '🧠' },
  { label: 'Extracting entities…',icon: '🔍' },
];

function ProcessingOverlay({ fileType }) {
  return (
    <div
      className="glass-card p-8 flex flex-col items-center gap-6 text-center"
      style={{ animation: 'var(--animate-scale-in)' }}
    >
      {/* Animated orbit */}
      <div className="relative w-20 h-20">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '2px solid rgba(191,255,0,0.15)',
            animation: 'var(--animate-spin-slow)',
            borderTopColor: 'var(--color-lime)',
          }}
        />
        <div
          className="absolute inset-3 rounded-full flex items-center justify-center text-2xl"
          style={{ backgroundColor: 'rgba(191,255,0,0.06)', border: '1px solid rgba(191,255,0,0.2)' }}
        >
          {fileType === 'pdf' ? '📄' : fileType === 'docx' ? '📝' : '🖼️'}
        </div>
      </div>

      <div>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'white', margin: '0 0 0.5rem' }}>
          Processing your document
        </p>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-soft)', margin: 0 }}>
          {fileType === 'image' ? 'OCR can take 10–30 seconds for large images' : 'Usually takes 5–15 seconds'}
        </p>
      </div>

      <div className="w-full flex flex-col gap-2">
        {PROCESSING_STEPS.map((step, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg"
            style={{
              backgroundColor: 'rgba(191,255,0,0.04)',
              border: '1px solid rgba(191,255,0,0.08)',
              animation: 'var(--animate-fade-up)',
              animationDelay: `${i * 400}ms`,
            }}
          >
            <span style={{ fontSize: '0.9rem', minWidth: '1.5rem' }}>{step.icon}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-soft)', fontFamily: 'var(--font-mono)', flex: 1, textAlign: 'left' }}>
              {step.label}
            </span>
            <Spinner size={14} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [file,   setFile]   = useState(null);
  const [apiKey, setApiKey] = useState(localStorage.getItem('docuai_apikey') || '');
  const { result, loading, analyze, reset } = useAnalyze();

  const handleApiKeyChange = (val) => {
    setApiKey(val);
    localStorage.setItem('docuai_apikey', val);
  };

  const handleReset = () => {
    reset();
    setFile(null);
  };

  const handleAnalyze = () => {
    analyze(file, apiKey);
  };

  const fileType = file
    ? (file.type.includes('pdf') ? 'pdf' : file.type.includes('word') ? 'docx' : 'image')
    : null;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-base)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(191,255,0,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(191,255,0,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Glow orbs */}
      <div style={{ position: 'fixed', top: '-20%', left: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(191,255,0,0.04) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,204,0.04) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />

      <div className="relative" style={{ zIndex: 1, maxWidth: '860px', margin: '0 auto', padding: '3rem 1.5rem 6rem' }}>
        {/* Nav */}
        <nav className="flex items-center justify-between mb-12" style={{ animation: 'var(--animate-fade-in)' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
              style={{ backgroundColor: 'var(--color-lime)', color: '#050507' }}
            >
              ⚡
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>
              Docu<span style={{ color: 'var(--color-lime)' }}>AI</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="tag tag-lime" style={{ fontSize: '0.65rem' }}>v1.0</span>
            <span className="tag tag-muted" style={{ fontSize: '0.65rem' }}>Track 2</span>
          </div>
        </nav>

        {/* Hero */}
        <div className="text-center mb-12" style={{ animation: 'var(--animate-fade-up)' }}>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(191,255,0,0.08)', border: '1px solid rgba(191,255,0,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-lime)', display: 'inline-block', animation: 'var(--animate-pulse-lime)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--color-lime)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
              AI-Powered · PDF · DOCX · Image OCR
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, margin: '0 0 1rem', color: 'white', letterSpacing: '-0.03em' }}>
            Drop a doc.<br />
            <span style={{ color: 'var(--color-lime)' }}>Get the intel.</span>
          </h1>

          <p style={{ fontSize: '1rem', color: 'var(--color-soft)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
            Instantly extract summaries, named entities, and sentiment from any document — no cap.
          </p>
        </div>

        {/* Main panel */}
        {result ? (
          <ResultCard result={result} onReset={handleReset} />
        ) : loading ? (
          <ProcessingOverlay fileType={fileType} />
        ) : (
          <div className="glass-card p-6 flex flex-col gap-6" style={{ animation: 'var(--animate-fade-up)', animationDelay: '200ms' }}>
            <DropZone file={file} onFile={setFile} />

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
              <ApiKeyInput value={apiKey} onChange={handleApiKeyChange} />
            </div>

            <button
              className="btn-lime w-full"
              style={{ fontSize: '0.95rem', padding: '0.875rem', letterSpacing: '0.08em' }}
              disabled={!file || !apiKey || loading}
              onClick={handleAnalyze}
            >
              ⚡ Analyze Document
            </button>

            {/* Supported formats reminder */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span style={{ fontSize: '0.7rem', color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>supports</span>
              {['PDF', 'DOCX', 'PNG', 'JPG', 'TIFF'].map((f) => (
                <span key={f} className="tag tag-muted" style={{ fontSize: '0.6rem', padding: '0.1rem 0.4rem' }}>{f}</span>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16" style={{ animation: 'var(--animate-fade-in)', animationDelay: '500ms' }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--color-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
            DOCUAI · TRACK 2 · AI-POWERED DOCUMENT ANALYSIS
          </p>
        </div>
      </div>
    </div>
  );
}