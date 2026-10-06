import { useMemo, useState } from 'react'
import ScreenHeader from '../components/ScreenHeader.jsx'
import Icon from '../components/Icon.jsx'
import Modal from '../components/Modal.jsx'
import HabitLibraryModal from '../components/HabitLibraryModal.jsx'
import { getHabitProgress, getLocalDateKey, TIME_LABELS, WEEKDAYS } from '../domain/habits.js'

function scheduleLabel(days = []) {
  if (days.length === 7) return 'Setiap hari'
  if (days.length === 5 && [1, 2, 3, 4, 5].every(day => days.includes(day))) return 'Hari sekolah'
  return WEEKDAYS.filter(day => days.includes(day.value)).map(day => day.short).join(' · ')
}

export default function HabitsScreen({
  state,
  addHabit,
  patchHabit,
  togglePauseHabit,
  archiveHabit,
  graduateHabit,
}) {
  const [showLibrary, setShowLibrary] = useState(false)
  const [editor, setEditor] = useState(null)
  const [filter, setFilter] = useState('Semua')
  const [graduationCandidate, setGraduationCandidate] = useState(null)
  const todayKey = getLocalDateKey()

  const active = useMemo(
    () => state.habits.filter(habit => !habit.graduated && !habit.archived),
    [state.habits],
  )

  const filtered = active.filter(habit =>
    filter === 'Semua' || habit.time === filter)

  const graduated = state.habits.filter(habit => habit.graduated)
  const archived = state.habits.filter(habit => habit.archived)

  const quickAdd = template => {
    addHabit({
      ...template,
      id: `habit-${template.id}-${Date.now()}`,
    })
  }

  const customizeTemplate = template => {
    setShowLibrary(false)
    setEditor({ habit: template, isNew: true })
  }

  const saveEditor = habit => {
    if (editor?.isNew) addHabit(habit)
    else patchHabit(habit.id, habit)
    setEditor(null)
  }

  const confirmGraduation = () => {
    if (!graduationCandidate) return
    graduateHabit(graduationCandidate.habit.id)
    setGraduationCandidate(null)
  }

  return <div className="app-content">
    <ScreenHeader
      eyebrow="AREA ORANG TUA"
      title="Kebiasaan"
      subtitle="Tambah cepat dari library. Atur detail hanya kalau perlu."
      action={<button className="add-button" onClick={() => setShowLibrary(true)}><Icon name="plus" size={17} /> Tambah</button>}
    />

    <div className="habit-filter">
      {[
        ['Semua', 'Semua'],
        ['Pagi', 'Morning'],
        ['Sepulang sekolah', 'Afternoon'],
        ['Kapan saja', 'Anytime'],
        ['Malam', 'Evening'],
      ].map(([label, value]) => <button
        key={value}
        className={filter === value ? 'filter-selected' : ''}
        onClick={() => setFilter(value)}
      >
        {label}{value === 'Semua' && <span>{active.length}</span>}
      </button>)}
    </div>

    <section className="habit-list">
      {filtered.map(habit => {
        const progress = getHabitProgress(habit)
        const waiting = habit.pendingDate === todayKey

        return <article
          className={`habit-card habit-stage-${progress.stage} ${habit.paused ? 'habit-paused' : ''}`}
          key={habit.id}
          role="button"
          tabIndex="0"
          onClick={() => setEditor({ habit, isNew: false })}
          onKeyDown={event => {
            if (event.key === 'Enter' || event.key === ' ') setEditor({ habit, isNew: false })
          }}
        >
          <div className="habit-card-icon">{habit.emoji}</div>
          <div className="habit-card-body">
            <div className="habit-meta">
              <span>{TIME_LABELS[habit.time]?.toUpperCase()}</span>
              <span>{scheduleLabel(habit.days)}</span>
              {habit.paused && <span className="paused-tag">DIJEDA</span>}
              {waiting && <span className="waiting-tag">PERLU DISETUJUI</span>}
            </div>
            <h3>{habit.title}</h3>
            <div className="habit-mini-progress">
              <span><i style={{ width: `${progress.completionRate}%` }} /></span>
              <small>{progress.label} · {progress.completed}/{progress.opportunities}</small>
            </div>
          </div>

          {progress.ready
            ? <button
                className="habit-status graduation-ready"
                onClick={event => {
                  event.stopPropagation()
                  setGraduationCandidate({ habit, progress })
                }}
                title="Siap lulus"
                aria-label={`Luluskan ${habit.title}`}
              ><Icon name="cup" size={17} /></button>
            : <span className={`habit-stage-pill stage-${progress.stage}`}>{habit.paused ? 'Ⅱ' : progress.stage === 'consistent' ? '✓' : progress.stage === 'building' ? '●' : '○'}</span>}
        </article>
      })}

      {!filtered.length && <div className="empty-approval"><span>🌱</span><p>Tidak ada kebiasaan di bagian ini.</p></div>}
    </section>

    <div className="independence-callout">
      <span>🌱</span>
      <div>
        <strong>Kebiasaan bisa dijeda tanpa merusak progres.</strong>
        <p>Ketuk kebiasaan untuk edit jadwal, persetujuan, jeda, atau arsip.</p>
      </div>
    </div>

    <section className="section-block graduated-section">
      <div className="section-heading">
        <div><span className="eyebrow">SUDAH BISA SENDIRI</span><h2>Kebiasaan yang sudah lulus</h2></div>
        <span className="count-pill green">{graduated.length}</span>
      </div>

      {graduated.length
        ? graduated.map(habit => <div className="graduated-row" key={habit.id}>
            <span>{habit.emoji}</span>
            <strong>{habit.title}</strong>
            <span className="graduated-check"><Icon name="check" size={15} /></span>
          </div>)
        : <p className="muted small-note">Kebiasaan yang sudah benar-benar mandiri akan muncul di sini.</p>}

      {archived.length > 0 && <p className="archived-note">{archived.length} kebiasaan diarsipkan.</p>}
    </section>

    {showLibrary && <HabitLibraryModal
      goals={state.goals}
      existingHabits={state.habits}
      onClose={() => setShowLibrary(false)}
      onQuickAdd={quickAdd}
      onCustomize={customizeTemplate}
    />}

    {editor && <Modal
      initialHabit={editor.habit}
      isNew={editor.isNew}
      onClose={() => setEditor(null)}
      onSave={saveEditor}
      onTogglePause={() => {
        togglePauseHabit(editor.habit.id)
        setEditor(null)
      }}
      onArchive={() => {
        archiveHabit(editor.habit.id)
        setEditor(null)
      }}
    />}

    {graduationCandidate && <div className="modal-backdrop" role="presentation" onClick={() => setGraduationCandidate(null)}>
      <section className="modal-card graduation-modal" role="dialog" aria-modal="true" aria-labelledby="graduation-title" onClick={event => event.stopPropagation()}>
        <div className="graduation-modal-icon">🎓</div>
        <span className="eyebrow">SIAP LULUS</span>
        <h2 id="graduation-title">{graduationCandidate.habit.title}</h2>
        <p className="muted">
          {state.child.name} menyelesaikan {graduationCandidate.progress.completed} dari {graduationCandidate.progress.opportunities} kesempatan,
          dengan konsistensi {graduationCandidate.progress.last30Rate}% pada 30 kesempatan terakhir.
        </p>
        <div className="graduation-question">
          <strong>Apakah {state.child.name} sudah mulai melakukannya tanpa perlu terus diingatkan?</strong>
          <small>Jika ya, kebiasaan akan keluar dari daftar harian dan masuk ke “Sudah Bisa Sendiri”.</small>
        </div>
        <button className="button button-primary button-full" onClick={confirmGraduation}>Ya, luluskan kebiasaan ini</button>
        <button className="button button-secondary button-full" onClick={() => setGraduationCandidate(null)}>Lanjut latihan</button>
      </section>
    </div>}
  </div>
}
