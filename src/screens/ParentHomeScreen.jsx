import ScreenHeader from '../components/ScreenHeader.jsx'
import ProgressRing from '../components/ProgressRing.jsx'
import Icon from '../components/Icon.jsx'
import { getLocalDateKey } from '../data/constants.js'

export default function ParentHomeScreen({ state, onApprove, setScreen }) {
  const active = state.habits.filter(habit => !habit.graduated)
  const completed = active.filter(habit => habit.doneDates.includes(getLocalDateKey())).length
  const waiting = active.filter(habit => habit.status === 'waiting')
  const progress = active.length ? Math.round(completed / active.length * 100) : 0
  const todayLabel = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date()).toUpperCase()
  return <div className="app-content">
    <ScreenHeader eyebrow={todayLabel} title={`Hi, ${state.child.name}’s grown-up`} subtitle="Little steps are adding up." action={<button className="tiny-avatar">👩🏻</button>} />
    <section className="daily-card"><div className="daily-card-top"><div><span className="card-kicker">TODAY’S CHECK-IN</span><h2>You’re building a rhythm.</h2></div><div className="weather-illustration">☀️</div></div><div className="daily-summary"><ProgressRing value={progress}/><div className="daily-summary-copy"><strong>{completed} <span>of {active.length} habits done</span></strong><small>{completed === 0 ? 'Every journey begins with one small step.' : 'That’s a lovely bit of progress.'}</small></div></div><button className="text-button" onClick={() => setScreen('habits')}>See today’s habits <Icon name="arrow" size={16}/></button></section>
    <section className="section-block"><div className="section-heading"><div><span className="eyebrow">YOUR NEXT SMALL STEP</span><h2>Needs your thumbs-up</h2></div><span className="count-pill">{waiting.length}</span></div>
      {waiting.length ? <div className="approval-list">{waiting.map(habit => <div className="approval-item" key={habit.id}><span className="habit-icon">{habit.emoji}</span><div className="approval-copy"><strong>{state.child.name} says they…</strong><span>{habit.title}</span></div><button className="approve-button" onClick={() => onApprove(habit.id)} aria-label={`Approve ${habit.title}`}><Icon name="check" size={17}/></button><button className="not-yet-button" onClick={() => onApprove(habit.id, false)}>Not yet</button></div>)}</div> : <div className="empty-approval"><span>🌱</span><p>Nothing waiting right now.<br/><strong>Practice is where confidence grows.</strong></p></div>}
    </section>
    <section className="section-block week-card"><div className="section-heading"><div><span className="eyebrow">THIS WEEK</span><h2>Showing up matters</h2></div><button className="more-button" onClick={() => setScreen('kid-journey')}>Progress <Icon name="arrow" size={15}/></button></div><div className="week-bars">{['M','T','W','T','F','S','S'].map((day, i) => <div className="week-day" key={`${day}-${i}`}><div className={`week-bar ${i < state.streak ? 'bar-filled' : ''}`} style={{ height: `${[34,52,42,65,36,49,28][i]}px` }}>{i < state.streak ? <span>✓</span> : null}</div><span>{day}</span></div>)}</div></section>
    <section className="graduation-nudge"><span className="nudge-icon">🌈</span><div><strong>Growing into independence</strong><p>Celebrate a habit your child can do on their own.</p></div><button onClick={() => setScreen('habits')} aria-label="See habits"><Icon name="arrow" size={17}/></button></section>
  </div>
}
