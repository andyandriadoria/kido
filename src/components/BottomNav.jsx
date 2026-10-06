import Icon from './Icon.jsx'

export default function BottomNav({ screen, setScreen, mode }) {
  const items = mode === 'parent'
    ? [{ id: 'parent-home', label: 'Home', icon: 'home' }, { id: 'habits', label: 'Habits', icon: 'habits' }, { id: 'kid-journey', label: 'Progress', icon: 'journey' }]
    : [{ id: 'kid-today', label: 'Today', icon: 'today' }, { id: 'kid-journey', label: 'Journey', icon: 'journey' }]
  return <nav className="bottom-nav" aria-label="Main navigation">
    {items.map(item => <button key={item.id} className={`nav-item ${screen === item.id ? 'selected' : ''}`} onClick={() => setScreen(item.id)} aria-current={screen === item.id ? 'page' : undefined}>
      <Icon name={item.icon} size={21} /><span>{item.label}</span>
    </button>)}
    <button className={`nav-item ${screen === 'profile' ? 'selected' : ''}`} onClick={() => setScreen('profile')} aria-current={screen === 'profile' ? 'page' : undefined}><span className="nav-avatar">{mode === 'parent' ? '👩🏻' : '🦊'}</span><span>{mode === 'parent' ? 'Profile' : 'Me'}</span></button>
  </nav>
}
