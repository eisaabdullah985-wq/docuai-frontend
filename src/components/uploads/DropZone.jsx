import { useState, useRef, useCallback } from 'react';
import { detectFileType, formatBytes, ACCEPTED_MIME } from '../../utils/fileUtils';

const FILE_ICONS = {
  pdf:   '📄',
  docx:  '📝',
  image: '🖼️',
};

const TYPE_LABELS = {
  pdf:   'PDF',
  docx:  'DOCX',
  image: 'Image',
};

export default function DropZone({ file, onFile }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = useCallback((f) => {
    if (!f) return;
    const type = detectFileType(f);
    if (!type) {
      alert('Unsupported file. Please upload a PDF, DOCX, or image.');
      return;
    }
    onFile(f);
  }, [onFile]);

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    handleFile(f);
  };

  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);

  const fileType = file ? detectFileType(file) : null;

  if (file) {
    return (
      <div
        className="glass-card-lime p-6 flex items-center gap-4"
        style={{ animation: 'var(--animate-scale-in)' }}
      >
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ backgroundColor: 'rgba(191,255,0,0.08)', border: '1px solid rgba(191,255,0,0.2)' }}
        >
          {FILE_ICONS[fileType] || '📎'}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-medium truncate" style={{ color: 'white', fontFamily: 'var(--font-display)' }}>
            {file.name}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="tag tag-lime">{TYPE_LABELS[fileType]}</span>
            <span className="text-xs" style={{ color: 'var(--color-soft)', fontFamily: 'var(--font-mono)' }}>
              {formatBytes(file.size)}
            </span>
          </div>
        </div>

        <button
          onClick={() => onFile(null)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors flex-shrink-0"
          style={{ color: 'var(--color-soft)', border: '1px solid var(--color-border)', background: 'none', cursor: 'pointer' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-danger)'; e.currentTarget.style.borderColor = 'var(--color-danger)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-soft)'; e.currentTarget.style.borderColor = 'var(--color-border)'; }}
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <div
      className={`drop-zone ${dragging ? 'dragging' : ''}`}
      style={{ padding: '3rem 2rem', textAlign: 'center', cursor: 'pointer' }}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={() => inputRef.current?.click()}
    >
      {dragging && <div className="scan-line" />}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_MIME}
        style={{ display: 'none' }}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      <div
        className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl"
        style={{
          backgroundColor: 'rgba(191,255,0,0.06)',
          border: '1px solid rgba(191,255,0,0.15)',
          transition: 'all 250ms',
          boxShadow: dragging ? 'var(--glow-lime)' : 'none',
        }}
      >
        {dragging ? '⚡' : '📂'}
      </div>

      <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'white', margin: '0 0 0.5rem' }}>
        {dragging ? 'Drop it!' : 'Drop your document here'}
      </p>
      <p style={{ fontSize: '0.8rem', color: 'var(--color-soft)', margin: '0 0 1.25rem' }}>
        or click to browse
      </p>

      <div className="flex items-center justify-center gap-2 flex-wrap">
        {['PDF', 'DOCX', 'PNG', 'JPG', 'TIFF', 'BMP', 'WebP'].map((ext) => (
          <span key={ext} className="tag tag-muted">{ext}</span>
        ))}
      </div>
    </div>
  );
}