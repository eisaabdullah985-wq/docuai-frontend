const ENTITY_CONFIG = {
  names:         { label: 'People',        icon: '👤', tagClass: 'tag-lime' },
  dates:         { label: 'Dates',         icon: '📅', tagClass: 'tag-cyan' },
  organizations: { label: 'Organisations', icon: '🏢', tagClass: 'tag-muted' },
  amounts:       { label: 'Amounts',       icon: '💰', tagClass: 'tag-muted' },
};

function EntityGroup({ entityKey, items, delay }) {
  const config = ENTITY_CONFIG[entityKey];
  if (!config || !items?.length) return null;

  return (
    <div style={{ animation: 'var(--animate-fade-up)', animationDelay: `${delay}ms` }}>
      <div className="flex items-center gap-2 mb-2.5">
        <span style={{ fontSize: '0.85rem' }}>{config.icon}</span>
        <span
          className="text-xs font-medium"
          style={{ color: 'var(--color-soft)', fontFamily: 'var(--font-display)', letterSpacing: '0.08em', textTransform: 'uppercase' }}
        >
          {config.label}
        </span>
        <span className="tag tag-muted" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
          {items.length}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span key={i} className={`tag ${config.tagClass}`} style={{ fontSize: '0.75rem' }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function EntitySection({ entities }) {
  if (!entities) return null;

  const hasAny = Object.values(entities).some((arr) => arr?.length > 0);
  if (!hasAny) {
    return (
      <p className="text-sm" style={{ color: 'var(--color-muted)', fontStyle: 'italic' }}>
        No entities detected in this document.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <EntityGroup entityKey="names"         items={entities.names}         delay={0}   />
      <EntityGroup entityKey="organizations" items={entities.organizations} delay={80}  />
      <EntityGroup entityKey="dates"         items={entities.dates}         delay={160} />
      <EntityGroup entityKey="amounts"       items={entities.amounts}       delay={240} />
    </div>
  );
}