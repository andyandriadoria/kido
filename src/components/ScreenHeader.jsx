export default function ScreenHeader({ eyebrow, title, subtitle, action }) {
  return <div className="screen-header"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{subtitle && <p className="muted">{subtitle}</p>}</div>{action}</div>
}
