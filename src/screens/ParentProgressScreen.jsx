import ScreenHeader from '../components/ScreenHeader.jsx'
import ProgressRing from '../components/ProgressRing.jsx'
import {
  calculateStreak,
  getHabitProgress,
  getWeekSummary,
  TIME_LABELS,
} from '../domain/habits.js'

const STAGE_RANK = { learning: 1, building: 2, consistent: 3, ready: 4 }

export default function ParentProgressScreen({ state }) {
  const active = state.habits.filter(habit => !habit.graduated && !habit.archived)
  const week = getWeekSummary(active)
  const streak = calculateStreak(active)

  const details = active.map(habit => {
    const progress = getHabitProgress(habit)
    const weekProgress = getWeekSummary([habit])
    return { habit, progress, weekProgress }
  })

  const closest = [...details].sort((a, b) =>
    (STAGE_RANK[b.progress.stage] || 0) - (STAGE_RANK[a.progress.stage] || 0)
    || b.progress.completionRate - a.progress.completionRate
  )[0]

  const needsPractice = [...details]
    .filter(item => item.progress.opportunities > 0)
    .sort((a, b) => a.progress.completionRate - b.progress.completionRate)[0]

  return <div className="app-content">
    <ScreenHeader
      eyebrow="PROGRES & KEMANDIRIAN"
      title={`Perkembangan ${state.child.name}`}
      subtitle="Fokus pada konsistensi, bukan kesempurnaan."
    />

    <section className="parent-progress-overview">
      <ProgressRing value={week.percentage} size={78} />
      <div>
        <span className="card-kicker">MINGGU INI</span>
        <strong>{week.completed} dari {week.total} aktivitas selesai</strong>
        <small>🔥 {streak} hari beruntun</small>
      </div>
    </section>

    <div className="parent-insight-grid">
      <section className="parent-insight-card">
        <span>🌱</span>
        <div>
          <small>PALING DEKAT KE MANDIRI</small>
          <strong>{closest ? closest.habit.title : 'Belum ada data'}</strong>
          <p>{closest ? `${closest.progress.label} · ${closest.progress.completionRate}% konsisten` : 'Tambahkan kebiasaan untuk mulai.'}</p>
        </div>
      </section>

      <section className="parent-insight-card attention">
        <span>🧭</span>
        <div>
          <small>PERLU LEBIH BANYAK LATIHAN</small>
          <strong>{needsPractice ? needsPractice.habit.title : 'Belum ada data'}</strong>
          <p>{needsPractice ? `${needsPractice.progress.completed} dari ${needsPractice.progress.opportunities} kesempatan selesai` : 'KIDO akan menampilkan kebiasaan yang butuh perhatian.'}</p>
        </div>
      </section>
    </div>

    <section className="section-block">
      <div className="section-heading">
        <div><span className="eyebrow">PER KEBIASAAN</span><h2>Lihat ceritanya, bukan sekadar angka</h2></div>
      </div>

      <div className="parent-progress-list">
        {details.map(({ habit, progress, weekProgress }) => <article className="parent-progress-row" key={habit.id}>
          <span className="progress-habit-icon">{habit.emoji}</span>
          <div className="progress-habit-copy">
            <div className="progress-row-title">
              <strong>{habit.title}</strong>
              <span>{progress.label}</span>
            </div>
            <small>{TIME_LABELS[habit.time]} · minggu ini {weekProgress.completed}/{weekProgress.total || 0}</small>
            <div className="progress-track"><i style={{ width: `${progress.completionRate}%` }} /></div>
            <small>{progress.completionRate}% konsisten · {progress.completed}/{progress.opportunities} kesempatan</small>
          </div>
        </article>)}

        {!details.length && <div className="empty-approval"><span>🌱</span><p>Belum ada kebiasaan aktif.</p></div>}
      </div>
    </section>
  </div>
}
