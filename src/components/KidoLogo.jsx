export default function KidoLogo({ large = false }) {
  return <span className={`kido-logo ${large ? 'kido-logo-large' : ''}`} aria-label="KIDO">
    <span className="logo-k">K</span><span className="logo-i">I</span><span className="logo-d">D</span>
    <span className="logo-o" aria-hidden="true"><i /></span>
  </span>
}
