import SentimentBadge from './SentimentBadge';
import EntitySection   from './EntitySection';

function Section({ title, icon, delay, children }) {
  return (
    <div
      className="glass-card p-5"
      style={{ animation: 'var(--animate-slide-up)', animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span style={{ fontSize: '1rem' }}>{icon}</span>
        <h3
          className="text-sm font-semibold"
          style={{
            color: 'var(--color-lime)',
            fontFamily: 'var(--font-display)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function JsonBlock({ data }) {
  return (
    <pre
      className="rounded-xl p-4 overflow-x-auto text-xs leading-relaxed"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-cyan)',
        fontFamily: 'var(--font-mono)',
        maxHeight: '300px',
        overflowY: 'auto',
      }}
    >
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

export default function ResultCard({ result, onReset }) {
  if (!result) return null;

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
  };

  return (
    <div className="flex flex-col gap-4" style={{ animation: 'var(--animate-fade-in)' }}>
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: 'var(--color-lime)', boxShadow: 'var(--glow-lime)', animation: 'var(--animate-pulse-lime)' }}
          />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: 'var(--color-soft)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Analysis Complete
          </span>
          <span className="tag tag-lime">{result.fileName}</span>
        </div>
        <div className="flex gap-2">
          <button className="btn-ghost" style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }} onClick={copyJson}>
            Copy JSON
          </button>
          <button className="btn-ghost" style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }} onClick={onReset}>
            New doc
          </button>
        </div>
      </div>

      {/* Summary */}
      <Section title="Summary" icon="📋" delay={0}>
        <p style={{ color: 'var(--color-light)', fontSize: '0.9rem', lineHeight: '1.7', margin: 0 }}>
          {result.summary}
        </p>
      </Section>

      {/* Sentiment */}
      <Section title="Sentiment" icon="🧠" delay={100}>
        <SentimentBadge sentiment={result.sentiment} />
      </Section>

      {/* Entities */}
      <Section title="Entities" icon="🔍" delay={200}>
        <EntitySection entities={result.entities} />
      </Section>

      {/* Raw JSON */}
      <Section title="Raw JSON Response" icon="⚙️" delay={300}>
        <JsonBlock data={result} />
      </Section>
    </div>
  );
}