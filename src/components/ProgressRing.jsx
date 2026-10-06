export default function ProgressRing({ value = 0, label = 'done', size = 66, color = 'var(--color-primary)' }) {
  const radius = 27
  const circumference = 2 * Math.PI * radius
  return <div className="progress-ring" style={{ width: size, height: size, '--ring-color': color }}>
    <svg viewBox="0 0 64 64" aria-label={`${value}% ${label}`}>
      <circle className="ring-track" cx="32" cy="32" r={radius} />
      <circle className="ring-value" cx="32" cy="32" r={radius} style={{ strokeDasharray: circumference, strokeDashoffset: circumference * (1 - value / 100) }} />
    </svg>
    <strong>{value}%</strong>
  </div>
}
