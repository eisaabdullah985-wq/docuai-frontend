import { useState } from 'react';

export default function ApiKeyInput({ value, onChange }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label
        className="block text-xs font-medium mb-2"
        style={{ color: 'var(--color-soft)', fontFamily: 'var(--font-display)', letterSpacing: '0.08em', textTransform: 'uppercase' }}
      >
        API Key
      </label>
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          className="input-field pr-10"
          placeholder="sk_track2_•••••••••"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          autoComplete="off"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs transition-colors"
          style={{ color: 'var(--color-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-lime)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-muted)'; }}
        >
          {visible ? '🙈' : '👁️'}
        </button>
      </div>
      <p className="mt-1.5 text-xs" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
        Sent as <span style={{ color: 'var(--color-cyan)' }}>x-api-key</span> header
      </p>
    </div>
  );
}