import Icon from './Icon.jsx'
export default function TopBar({ title, mode, setMode, child, back, onBack }) {
  return <header className="topbar">
    {back ? <button className="icon-button" aria-label="Go back" onClick={onBack}><Icon name="back" /></button> : <a className="brand-mark" href="#home" onClick={e => { e.preventDefault(); onBack?.() }} aria-label="KIDO home"><span className="brand-sun">✦</span><span>kido</span></a>}
    {title && <span className="topbar-title">{title}</span>}
    {setMode && <button className="mode-switch" onClick={() => setMode(mode === 'parent' ? 'kid' : 'parent')} aria-label="Switch view">
      <span className={mode === 'parent' ? 'mode-active' : ''}>Parent</span><span className={mode === 'kid' ? 'mode-active' : ''}>Kid</span>
    </button>}
    {!setMode && child && <button className="child-chip" onClick={() => {}}><span>{child.avatar}</span><span>{child.name}</span><span className="chevron">⌄</span></button>}
  </header>
}
