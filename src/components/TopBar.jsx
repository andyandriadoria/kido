import Icon from './Icon.jsx'

export default function TopBar({ title, mode, setMode, child, back, onBack }) {
  return <header className="topbar">
    {back
      ? <button className="icon-button" aria-label="Kembali" onClick={onBack}><Icon name="back" /></button>
      : <a className="brand-mark" href="#home" onClick={event => { event.preventDefault(); onBack?.() }} aria-label="Beranda KIDO"><span className="brand-sun">✦</span><span>kido</span></a>}

    {title && <span className="topbar-title">{title}</span>}

    {setMode && <button className="mode-switch" onClick={() => setMode(mode === 'parent' ? 'kid' : 'parent')} aria-label="Ganti mode">
      <span className={mode === 'parent' ? 'mode-active' : ''}>Ortu</span>
      <span className={mode === 'kid' ? 'mode-active' : ''}>Anak</span>
    </button>}

    {!setMode && child && <button className="child-chip"><span>{child.avatar}</span><span>{child.name}</span></button>}
  </header>
}
