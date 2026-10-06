import ScreenHeader from '../components/ScreenHeader.jsx'
import Icon from '../components/Icon.jsx'
import ProgressRing from '../components/ProgressRing.jsx'
import { getLocalDateKey } from '../data/constants.js'

export default function KidTodayScreen({ state, onPractice, setScreen }) {
  const active = state.habits.filter(habit => !habit.graduated)
  const done = active.filter(habit => habit.doneDates.includes(getLocalDateKey())).length
  const progress = active.length ? Math.round(done / active.length * 100) : 0
  return <div className="app-content kid-content">
    <ScreenHeader eyebrow="TODAY’S ADVENTURE" title={`You’ve got this, ${state.child.name}!`} subtitle="One little thing at a time." action={<span className="streak-pill">🔥 {state.streak} day streak</span>} />
    <section className="kid-xp-card"><div className="xp-copy"><span className="card-kicker">YOUR GROWING POWER</span><strong>{state.xp} <small>XP</small></strong><span className="xp-level">Level 2 · Brave Beginner</span><div className="xp-track"><i style={{ width: `${state.xp % 100}%` }}/></div><small>{100 - (state.xp % 100)} XP to your next level</small></div><div className="xp-illustration">⭐</div></section>
    <section className="kid-today-card"><div className="kid-today-heading"><div><span className="eyebrow">YOUR LITTLE WINS</span><h2>Ready for today?</h2></div><ProgressRing value={progress} size={58} color="var(--color-secondary)"/></div>
      <div className="kid-task-list">{active.map(habit => {
        const completed = habit.doneDates.includes(getLocalDateKey())
        return <div className={`kid-task ${completed ? 'task-done' : ''}`} key={habit.id}><span className="task-emoji">{habit.emoji}</span><div className="task-text"><strong>{habit.title}</strong><small>{completed ? 'You did it today!' : habit.status === 'waiting' ? 'Waiting for a grown-up' : 'A small step counts'}</small></div>{completed ? <span className="task-complete"><Icon name="check" size={17}/></span> : habit.status === 'waiting' ? <span className="waiting-dot">···</span> : <button className="practice-button" onClick={() => onPractice(habit.id)}>I did it! <Icon name="arrow" size={15}/></button>}</div>
      })}</div>
      <div className="kid-encouragement"><span>💛</span><span>Trying is already something to be proud of.</span></div>
    </section>
    <button className="journey-peek" onClick={() => setScreen('kid-journey')}><span className="journey-peek-art">🏕️</span><span><small>YOUR JOURNEY</small><strong>Look how you’re growing</strong></span><Icon name="arrow" size={17}/></button>
  </div>
}
