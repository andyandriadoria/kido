import ScreenHeader from '../components/ScreenHeader.jsx'
import Icon from '../components/Icon.jsx'
import ProgressRing from '../components/ProgressRing.jsx'
import {
  calculateStreak,
  getDailyProgress,
  getLevelInfo,
  getLocalDateKey,
} from '../domain/habits.js'

export default function KidTodayScreen({ state, onPractice, setScreen }) {
  const today = new Date()
  const todayKey = getLocalDateKey(today)
  const daily = getDailyProgress(state.habits, today)
  const streak = calculateStreak(state.habits, today)
  const level = getLevelInfo(state.xp)

  return <div className="app-content kid-content">
    <ScreenHeader
      eyebrow="TODAY’S ADVENTURE"
      title={`You’ve got this, ${state.child.name}!`}
      subtitle="One little thing at a time."
      action={<span className="streak-pill">🔥 {streak} day streak</span>}
    />

    <section className="kid-xp-card">
      <div className="xp-copy">
        <span className="card-kicker">YOUR GROWING POWER</span>
        <strong>{state.xp} <small>XP</small></strong>
        <span className="xp-level">Level {level.level} · {level.title}</span>
        <div className="xp-track"><i style={{ width: `${level.percentage}%` }} /></div>
        <small>{level.nextIn} XP to your next level</small>
      </div>
      <div className="xp-illustration">⭐</div>
    </section>

    <section className="kid-today-card">
      <div className="kid-today-heading">
        <div><span className="eyebrow">YOUR LITTLE WINS</span><h2>{daily.total ? 'Ready for today?' : 'A lighter day today'}</h2></div>
        <ProgressRing value={daily.percentage} size={58} color="var(--color-secondary)" />
      </div>

      {daily.total
        ? <div className="kid-task-list">{daily.scheduled.map(habit => {
            const completed = habit.doneDates.includes(todayKey)
            const waiting = habit.pendingDate === todayKey
            return <div className={`kid-task ${completed ? 'task-done' : ''}`} key={habit.id}>
              <span className="task-emoji">{habit.emoji}</span>
              <div className="task-text">
                <strong>{habit.title}</strong>
                <small>{completed
                  ? `You did it · +${habit.xpValue} XP`
                  : waiting
                    ? 'Waiting for a grown-up'
                    : habit.approvalRequired
                      ? `+${habit.xpValue} XP · grown-up checks this one`
                      : `+${habit.xpValue} XP`}</small>
              </div>
              {completed
                ? <span className="task-complete"><Icon name="check" size={17} /></span>
                : waiting
                  ? <span className="waiting-dot">···</span>
                  : <button className="practice-button" onClick={() => onPractice(habit.id)}>I did it! <Icon name="arrow" size={15} /></button>}
            </div>
          })}</div>
        : <div className="kid-empty-day"><span>🌤️</span><strong>Nothing scheduled right now.</strong><small>Enjoy your day and come back when your next habit is ready.</small></div>}

      <div className="kid-encouragement">
        <span>💛</span>
        <span>{daily.goalMet ? 'Today’s goal is complete. Go enjoy your day!' : 'Trying is already something to be proud of.'}</span>
      </div>
    </section>

    <button className="journey-peek" onClick={() => setScreen('kid-journey')}>
      <span className="journey-peek-art">🏕️</span>
      <span><small>YOUR JOURNEY</small><strong>Look how you’re growing</strong></span>
      <Icon name="arrow" size={17} />
    </button>
  </div>
}
