import ScreenHeader from '../components/ScreenHeader.jsx'
import Icon from '../components/Icon.jsx'
import ProgressRing from '../components/ProgressRing.jsx'
import {
  calculateStreak,
  getDailyProgress,
  getLevelInfo,
  getLocalDateKey,
  TIME_LABELS,
} from '../domain/habits.js'

const GROUP_ORDER = ['Morning', 'Afternoon', 'Anytime', 'Evening']

export default function KidTodayScreen({ state, onPractice, setScreen }) {
  const today = new Date()
  const todayKey = getLocalDateKey(today)
  const daily = getDailyProgress(state.habits, today)
  const streak = calculateStreak(state.habits, today)
  const level = getLevelInfo(state.xp)

  const groups = GROUP_ORDER
    .map(time => ({
      time,
      habits: daily.scheduled.filter(habit => habit.time === time),
    }))
    .filter(group => group.habits.length)

  return <div className="app-content kid-content">
    <ScreenHeader
      eyebrow="PETUALANGAN HARI INI"
      title={`Ayo, ${state.child.name}!`}
      subtitle="Lihat satu bagian, kerjakan, lalu lanjutkan harimu."
      action={<span className="streak-pill">🔥 {streak} hari</span>}
    />

    <section className="kid-xp-card">
      <div className="xp-copy">
        <span className="card-kicker">PROGRESKU</span>
        <strong>{state.xp} <small>XP</small></strong>
        <span className="xp-level">Level {level.level} · {level.title}</span>
        <div className="xp-track"><i style={{ width: `${level.percentage}%` }} /></div>
        <small>{level.nextIn} XP lagi ke level berikutnya</small>
      </div>
      <div className="xp-illustration">⭐</div>
    </section>

    <section className="kid-today-card">
      <div className="kid-today-heading">
        <div><span className="eyebrow">HARI INI</span><h2>{daily.total ? `${daily.completedCount} dari ${daily.total} selesai` : 'Hari ini lebih ringan'}</h2></div>
        <ProgressRing value={daily.percentage} size={62} color="var(--color-secondary)" />
      </div>

      {groups.length
        ? <div className="kid-time-groups">{groups.map(group => <section className="kid-time-group" key={group.time}>
            <div className="kid-time-heading">
              <span>{TIME_LABELS[group.time]}</span>
              <small>{group.habits.filter(habit => habit.doneDates.includes(todayKey)).length}/{group.habits.length}</small>
            </div>

            <div className="kid-task-list">{group.habits.map(habit => {
              const completed = habit.doneDates.includes(todayKey)
              const waiting = habit.pendingDate === todayKey

              return <div className={`kid-task ${completed ? 'task-done' : ''}`} key={habit.id}>
                <span className="task-emoji">{habit.emoji}</span>
                <div className="task-text">
                  <strong>{habit.title}</strong>
                  <small>{completed
                    ? `Selesai · +${habit.xpValue} XP`
                    : waiting
                      ? 'Menunggu persetujuan orang tua'
                      : habit.approvalRequired
                        ? `+${habit.xpValue} XP · minta orang tua cek`
                        : `+${habit.xpValue} XP`}</small>
                </div>

                {completed
                  ? <span className="task-complete"><Icon name="check" size={18} /></span>
                  : waiting
                    ? <span className="waiting-badge">Menunggu</span>
                    : <button className="practice-button" onClick={() => onPractice(habit.id)}>Sudah! <Icon name="arrow" size={16} /></button>}
              </div>
            })}</div>
          </section>)}</div>
        : <div className="kid-empty-day"><span>🌤️</span><strong>Tidak ada jadwal sekarang.</strong><small>Nikmati harimu. KIDO akan menampilkan kebiasaan berikutnya sesuai jadwal.</small></div>}

      <div className="kid-encouragement">
        <span>💛</span>
        <span>{daily.goalMet ? 'Target hari ini selesai. Sekarang lanjutkan harimu!' : 'Tidak harus sempurna. Satu langkah kecil sudah berarti.'}</span>
      </div>
    </section>

    <button className="journey-peek" onClick={() => setScreen('kid-journey')}>
      <span className="journey-peek-art">🏕️</span>
      <span><small>PERJALANANKU</small><strong>Lihat bagaimana aku bertumbuh</strong></span>
      <Icon name="arrow" size={18} />
    </button>
  </div>
}
