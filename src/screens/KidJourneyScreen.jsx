import ScreenHeader from '../components/ScreenHeader.jsx'
import Icon from '../components/Icon.jsx'
import { calculateStreak, getHabitProgress, getLevelInfo } from '../domain/habits.js'

const STAGE_RANK = { learning: 1, building: 2, consistent: 3, ready: 4, graduated: 4 }

export default function KidJourneyScreen({ state, setScreen }) {
  const graduated = state.habits.filter(habit => habit.graduated)
  const active = state.habits.filter(habit => !habit.graduated && !habit.archived)
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
    { icon: '🌱', title: 'Langkah pertama', note: 'Kamu mulai punya rutinitas' },
    { icon: '🌿', title: 'Mulai terbiasa', note: 'Latihan membuatnya terasa lebih mudah' },
    { icon: '🌳', title: 'Aku bisa sendiri', note: 'Konsistensi berubah jadi percaya diri' },
    { icon: '🏆', title: 'Kebiasaan sudah melekat', note: 'Rayakan habit yang sudah lulus' },
  ]

  return <div className="app-content kid-content">
    <ScreenHeader
      eyebrow="PERJALANANKU"
      title="Lihat bagaimana kamu bertumbuh"
      subtitle="Setiap latihan kecil membuatmu makin mandiri."
      action={<span className="streak-pill">🔥 {streak} hari</span>}
    />

    <section className="journey-profile">
      <div className="journey-avatar">{state.child.avatar}</div>
      <div>
        <span className="card-kicker">LEVEL {level.level}</span>
        <h2>{level.title}</h2>
        <p>{state.xp} XP · {level.nextIn} XP lagi ke level berikutnya.</p>
      </div>
      <span className="journey-badge">⭐</span>
    </section>

    <section className="journey-path">
      <div className="path-heading">
        <div><span className="eyebrow">JALUR KEMANDIRIAN</span><h2>Selangkah demi selangkah</h2></div>
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
            {current && <span className="now-label">KAMU DI SINI</span>}
          </div>
        })}
      </div>
    </section>

    <section className="independent-card">
      <span className="independent-emoji">🌟</span>
      <div>
        <span className="eyebrow">SUDAH BISA SENDIRI</span>
        {graduated.length
          ? <ul>{graduated.map(habit => <li key={habit.id}>{habit.title}</li>)}</ul>
          : <><h3>Daftarnya masih kosong.</h3><p>Terus latihan. KIDO akan memberi tahu orang tuamu ketika sebuah kebiasaan siap lulus.</p></>}
      </div>
    </section>

    <section className="achievement-card">
      <div className="achievement-icon">🏅</div>
      <div>
        <span className="eyebrow">KEMENANGAN KECIL</span>
        <strong>{streak ? `${streak} hari beruntun!` : 'Mulai lagi hari ini'}</strong>
        <p>{streak ? 'Kamu terus berusaha. Itu yang penting.' : 'Satu langkah kecil cukup untuk memulai.'}</p>
      </div>
      <button onClick={() => setScreen('kid-today')} aria-label="Kembali ke hari ini"><Icon name="arrow" size={17} /></button>
    </section>
  </div>
}
