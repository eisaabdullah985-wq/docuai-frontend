const EMOJI = { Positive: '😊', Neutral: '😐', Negative: '😟' };

export default function SentimentBadge({ sentiment }) {
  const lower = sentiment?.toLowerCase() ?? 'neutral';
  return (
    <div
      className={`sentiment-${lower} tag`}
      style={{ fontSize: '0.8rem', padding: '0.4rem 0.875rem', borderRadius: '8px' }}
    >
      {EMOJI[sentiment] ?? '😐'} {sentiment ?? 'Neutral'}
    </div>
  );
}