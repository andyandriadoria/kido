import Icon from './Icon.jsx'

export default function BottomNav({ screen, setScreen, mode }) {
  const items = mode === 'parent'
    ? [
      { id: 'parent-home', label: 'Beranda', icon: 'home' },
      { id: 'habits', label: 'Kebiasaan', icon: 'habits' },
      { id: 'parent-progress', label: 'Progres', icon: 'journey' },
    ]
    : [
      { id: 'kid-today', label: 'Hari ini', icon: 'today' },
      { id: 'kid-journey', label: 'Perjalanan', icon: 'journey' },
    ]

  return <nav className="bottom-nav" aria-label="Navigasi utama">
    {items.map(item => <button
      key={item.id}
      className={`nav-item ${screen === item.id ? 'selected' : ''}`}
      onClick={() => setScreen(item.id)}
      aria-current={screen === item.id ? 'page' : undefined}
    >
      <Icon name={item.icon} size={21} />
      <span>{item.label}</span>
    </button>)}
  </nav>
}
