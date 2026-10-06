import ScreenHeader from '../components/ScreenHeader.jsx'
import ProgressRing from '../components/ProgressRing.jsx'
import Icon from '../components/Icon.jsx'
import {
  calculateStreak,
  getDailyProgress,
  getHabitProgress,
  getLocalDateKey,
  getWeekSummary,
} from '../domain/habits.js'

const STAGE_RANK = { learning: 1, building: 2, consistent: 3, ready: 4 }

export default function ParentHomeScreen({ state, onApprove, setScreen }) {
  const today = new Date()
  const todayKey = getLocalDateKey(today)
  const daily = getDailyProgress(state.habits, today)
  const waiting = daily.scheduled.filter(habit => habit.pendingDate === todayKey)
  const streak = calculateStreak(state.habits, today)
  const week = getWeekSummary(state.habits, today)

  const activeProgress = state.habits
    .filter(habit => !habit.graduated && !habit.archived)
    .map(habit => ({ habit, progress: getHabitProgress(habit, today) }))
    .sort((a, b) => (STAGE_RANK[b.progress.stage] || 0) - (STAGE_RANK[a.progress.stage] || 0))

  const focus = activeProgress[0]
  const todayLabel = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long' }).format(today).toUpperCase()

  return <div className="app-content">
    <ScreenHeader
      eyebrow={todayLabel}
      title={`Hari ini bersama ${state.child.name}`}
      subtitle="Lihat yang sudah selesai dan yang masih butuh bantuanmu."
    />

    <section className="daily-card">
      <div className="daily-card-top">
        <div><span className="card-kicker">PROGRES HARI INI</span><h2>{daily.goalMet ? 'Target hari ini tercapai.' : 'Sedang membangun ritme.'}</h2></div>
        <div className="weather-illustration">☀️</div>
      </div>
      <div className="daily-summary">
        <ProgressRing value={daily.percentage} />
        <div className="daily-summary-copy">
          <strong>{daily.completedCount} <span>dari {daily.total} selesai</span></strong>
          <small>{daily.total === 0 ? 'Tidak ada kebiasaan yang dijadwalkan hari ini.' : daily.completedCount === 0 ? 'Belum ada yang dicentang hari ini.' : 'Ada progres yang bisa diapresiasi.'}</small>
        </div>
      </div>
      <button className="text-button" onClick={() => setScreen('habits')}>Lihat kebiasaan <Icon name="arrow" size={16} /></button>
    </section>

    <section className="section-block">
      <div className="section-heading">
        <div><span className="eyebrow">PERLU TINDAKAN</span><h2>Menunggu persetujuan</h2></div>
        <span className="count-pill">{waiting.length}</span>
      </div>

      {waiting.length
        ? <div className="approval-list">{waiting.map(habit => <div className="approval-item" key={habit.id}>
            <span className="habit-icon">{habit.emoji}</span>
            <div className="approval-copy"><strong>{state.child.name} menandai selesai</strong><span>{habit.title}</span></div>
            <button className="approve-button" onClick={() => onApprove(habit.id)} aria-label={`Setujui ${habit.title}`}><Icon name="check" size={17} /></button>
            <button className="not-yet-button" onClick={() => onApprove(habit.id, false)}>Belum</button>
          </div>)}</div>
        : <div className="empty-approval"><span>🌱</span><p>Tidak ada yang perlu dicek sekarang.<br/><strong>Biarkan anak melanjutkan harinya.</strong></p></div>}
    </section>

    {focus && <section className="section-block week-card">
      <div className="section-heading">
        <div><span className="eyebrow">PALING DEKAT KE MANDIRI</span><h2>{focus.habit.title}</h2></div>
        <button className="more-button" onClick={() => setScreen('parent-progress')}>{focus.progress.label} <Icon name="arrow" size={15} /></button>
      </div>
      <div className="habit-stage-summary">
        <strong>{focus.progress.completionRate}% konsisten</strong>
        <span>{focus.progress.completed} dari {focus.progress.opportunities} kesempatan</span>
      </div>
    </section>}

    <section className="section-block week-card">
      <div className="section-heading">
        <div><span className="eyebrow">MINGGU INI</span><h2>{week.percentage}% selesai</h2></div>
        <button className="more-button" onClick={() => setScreen('parent-progress')}>Lihat detail <Icon name="arrow" size={15} /></button>
      </div>
      <div className="week-bars">
        {week.days.map(item => <div className={`week-day ${item.isFuture ? 'future' : ''}`} key={item.dateKey}>
          <div className={`week-bar ${item.goalMet ? 'bar-filled' : ''}`} style={{ height: `${Math.max(12, Math.round(item.percentage * 0.55))}px` }}>
            {item.goalMet ? <span>✓</span> : null}
          </div>
          <span>{item.short}</span>
        </div>)}
      </div>
      <div className="week-streak">🔥 {streak} hari beruntun</div>
    </section>
  </div>
}
