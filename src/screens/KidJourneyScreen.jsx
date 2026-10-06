import ScreenHeader from '../components/ScreenHeader.jsx'
import Icon from '../components/Icon.jsx'
import { calculateStreak, getHabitProgress, getLevelInfo } from '../domain/habits.js'

const STAGE_RANK = { learning: 1, building: 2, consistent: 3, ready: 4, graduated: 4 }

export default function KidJourneyScreen({ state, setScreen, mode = 'kid' }) {
  const graduated = state.habits.filter(habit => habit.graduated)
  const active = state.habits.filter(habit => !habit.graduated)
  const progress = active.map(habit => getHabitProgress(habit))
  const highestRank = Math.max(0, ...progress.map(item => STAGE_RANK[item.stage] || 0))
  const streak = calculateStreak(state.habits)
  const level = getLevelInfo(state.xp)

  const flags = [
    active.length > 0,
    highestRank >= 2,
    highestRank >= 3 || graduated.length > 0,
    graduated.length > 0,
  ]
  const currentIndex = flags.every(Boolean) ? 3 : Math.max(0, flags.findIndex(done => !done))

  const milestones = [
    { icon: '🌱', title: 'The first little steps', note: 'You began your routine' },
    { icon: '🌿', title: 'Finding your rhythm', note: 'Practice makes it feel familiar' },
    { icon: '🌳', title: 'I can do it myself!', note: 'Consistency is turning into confidence' },
    { icon: '🏆', title: 'A habit of your own', note: 'Celebrate a graduated habit' },
  ]

  return <div className="app-content kid-content">
    <ScreenHeader
      eyebrow={mode === 'parent' ? 'PROGRESS & INDEPENDENCE' : 'YOUR GROWING STORY'}
      title={mode === 'parent' ? `Look how far ${state.child.name} has come` : 'Look how far you’ve come'}
      subtitle={mode === 'parent' ? 'Every little practice is building confidence.' : 'Every little practice helps you grow.'}
      action={<span className="streak-pill">🔥 {streak}</span>}
    />

    <section className="journey-profile">
      <div className="journey-avatar">{state.child.avatar}</div>
      <div>
        <span className="card-kicker">LEVEL {level.level}</span>
        <h2>{level.title}</h2>
        <p>{state.xp} XP · {level.nextIn} XP to the next level.</p>
      </div>
      <span className="journey-badge">⭐</span>
    </section>

    <section className="journey-path">
      <div className="path-heading">
        <div><span className="eyebrow">YOUR INDEPENDENCE PATH</span><h2>Step by step</h2></div>
        <span className="path-count">{String(flags.filter(Boolean).length).padStart(2, '0')} / 04</span>
      </div>

      <div className="milestone-list">
        {milestones.map((item, index) => {
          const complete = flags[index]
          const current = index === currentIndex && !complete
          const future = !complete && !current
          return <div className={`milestone ${complete ? 'complete' : ''} ${current ? 'current' : ''} ${future ? 'future' : ''}`} key={item.title}>
            <div className="milestone-rail">
              <span className="milestone-node">{complete ? <Icon name="check" size={15} /> : item.icon}</span>
              {index < milestones.length - 1 && <i />}
            </div>
            <div className="milestone-copy"><strong>{item.title}</strong><small>{item.note}</small></div>
            {current && <span className="now-label">YOU’RE HERE</span>}
          </div>
        })}
      </div>
    </section>

    <section className="independent-card">
      <span className="independent-emoji">🌟</span>
      <div>
        <span className="eyebrow">THINGS I CAN DO BY MYSELF</span>
        {graduated.length
          ? <ul>{graduated.map(habit => <li key={habit.id}>{habit.title}</li>)}</ul>
          : <><h3>Your list is ready for a first.</h3><p>Keep practicing. KIDO will tell your grown-up when a habit may be ready to graduate.</p></>}
      </div>
    </section>

    <section className="achievement-card">
      <div className="achievement-icon">🏅</div>
      <div>
        <span className="eyebrow">A LITTLE CELEBRATION</span>
        <strong>{streak ? `${streak} day streak!` : 'A fresh start today'}</strong>
        <p>{streak ? 'You’ve been showing up. That matters.' : 'One small win is enough to begin.'}</p>
      </div>
      {mode === 'kid' && <button onClick={() => setScreen('kid-today')} aria-label="Back to today"><Icon name="arrow" size={17} /></button>}
    </section>
  </div>
}
