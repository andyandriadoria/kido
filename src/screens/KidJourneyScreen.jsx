import ScreenHeader from '../components/ScreenHeader.jsx'
import Icon from '../components/Icon.jsx'

const milestones = [
  { icon: '🌱', title: 'The first little steps', note: 'You began your routine', complete: true },
  { icon: '🌿', title: 'Finding your rhythm', note: 'Practice makes it feel familiar', complete: true },
  { icon: '🌳', title: 'Practicing with support', note: 'A grown-up is helping your routine grow', current: true },
  { icon: '🏆', title: 'I can do it myself!', note: 'Celebrate a habit you can do on your own', future: true },
]
export default function KidJourneyScreen({ state, setScreen, mode = 'kid' }) {
  const graduated = state.habits.filter(habit => habit.graduated)
  return <div className="app-content kid-content">
    <ScreenHeader eyebrow={mode === 'parent' ? 'PROGRESS & INDEPENDENCE' : 'YOUR GROWING STORY'} title={mode === 'parent' ? `Look how far ${state.child.name} has come` : 'Look how far you’ve come'} subtitle={mode === 'parent' ? 'Every little practice is building confidence.' : 'Every little practice helps you grow.'} action={<span className="streak-pill">🔥 {state.streak}</span>} />
    <button className="journey-profile" onClick={() => setScreen('profile')} aria-label="Open my profile"><div className="journey-avatar">{state.child.avatar}</div><div><span className="card-kicker">LEVEL 2</span><h2>Brave Beginner</h2><p>You’re learning to do more on your own.</p></div><span className="journey-badge">⭐</span></button>
    <section className="journey-path"><div className="path-heading"><div><span className="eyebrow">YOUR INDEPENDENCE PATH</span><h2>Step by step</h2></div><span className="path-count">02 / 04</span></div>
      <div className="milestone-list">{milestones.map((item, index) => <div className={`milestone ${item.complete ? 'complete' : ''} ${item.current ? 'current' : ''} ${item.future ? 'future' : ''}`} key={item.title}><div className="milestone-rail"><span className="milestone-node">{item.complete ? <Icon name="check" size={15}/> : item.icon}</span>{index < milestones.length - 1 && <i/>}</div><div className="milestone-copy"><strong>{item.title}</strong><small>{item.note}</small></div>{item.current && <span className="now-label">YOU’RE HERE</span>}</div>)}</div>
    </section>
    <section className="independent-card"><span className="independent-emoji">🌟</span><div><span className="eyebrow">THINGS I CAN DO BY MYSELF</span>{graduated.length ? <ul>{graduated.map(habit => <li key={habit.id}>{habit.title}</li>)}</ul> : <><h3>Your list is ready for a first.</h3><p>When a habit feels easy, you can celebrate it here.</p></>}</div></section>
    <section className="achievement-card"><div className="achievement-icon">🏅</div><div><span className="eyebrow">A LITTLE CELEBRATION</span><strong>4 day streak!</strong><p>You’ve been showing up. That matters.</p></div><button onClick={() => setScreen('kid-today')} aria-label="Back to today"><Icon name="arrow" size={17}/></button></section>
  </div>
}
