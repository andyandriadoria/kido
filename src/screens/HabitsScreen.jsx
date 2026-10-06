import { useMemo, useState } from 'react'
import ScreenHeader from '../components/ScreenHeader.jsx'
import Icon from '../components/Icon.jsx'
import Modal from '../components/Modal.jsx'
import { getHabitProgress, getLocalDateKey, WEEKDAYS } from '../domain/habits.js'

function scheduleLabel(days = []) {
  if (days.length === 7) return 'Every day'
  if (days.length === 5 && [1, 2, 3, 4, 5].every(day => days.includes(day))) return 'Weekdays'
  return WEEKDAYS.filter(day => days.includes(day.value)).map(day => day.short).join(' · ')
}

export default function HabitsScreen({ state, addHabit, graduateHabit }) {
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState('All habits')
  const [graduationCandidate, setGraduationCandidate] = useState(null)
  const todayKey = getLocalDateKey()

  const active = useMemo(() => state.habits.filter(habit => !habit.graduated), [state.habits])
  const filtered = active.filter(habit => filter === 'All habits' || habit.time.toLowerCase() === filter.toLowerCase())
  const graduated = state.habits.filter(habit => habit.graduated)

  const confirmGraduation = () => {
    if (!graduationCandidate) return
    graduateHabit(graduationCandidate.habit.id)
    setGraduationCandidate(null)
  }

  return <div className="app-content">
    <ScreenHeader
      eyebrow="PARENT SPACE"
      title="Habits that stick"
      subtitle="Practice first. Independence comes later."
      action={<button className="add-button" onClick={() => setShowModal(true)}><Icon name="plus" size={17} /> Add</button>}
    />

    <div className="habit-filter">
      {['All habits', 'Morning', 'Evening', 'Anytime'].map(item => <button
        key={item}
        className={filter === item ? 'filter-selected' : ''}
        onClick={() => setFilter(item)}
      >
        {item}{item === 'All habits' && <span>{active.length}</span>}
      </button>)}
    </div>

    <section className="habit-list">
      {filtered.map(habit => {
        const progress = getHabitProgress(habit)
        const waiting = habit.pendingDate === todayKey
        return <article className={`habit-card habit-stage-${progress.stage}`} key={habit.id}>
          <div className="habit-card-icon">{habit.emoji}</div>
          <div className="habit-card-body">
            <div className="habit-meta">
              <span>{habit.time.toUpperCase()}</span>
              <span>{scheduleLabel(habit.days)}</span>
              {waiting && <span className="waiting-tag">NEEDS APPROVAL</span>}
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
                onClick={() => setGraduationCandidate({ habit, progress })}
                title="Ready to graduate"
                aria-label={`Graduate ${habit.title}`}
              ><Icon name="cup" size={17} /></button>
            : <span className={`habit-stage-pill stage-${progress.stage}`}>{progress.stage === 'consistent' ? '✓' : progress.stage === 'building' ? '●' : '○'}</span>}
        </article>
      })}
    </section>

    <div className="independence-callout">
      <span>🌱</span>
      <div>
        <strong>Graduation is earned through practice.</strong>
        <p>KIDO suggests graduation after at least 30 scheduled practices and 85% consistency across the latest 30.</p>
      </div>
    </div>

    <section className="section-block graduated-section">
      <div className="section-heading">
        <div><span className="eyebrow">LOOK HOW FAR THEY’VE COME</span><h2>Things I can do by myself</h2></div>
        <span className="count-pill green">{graduated.length}</span>
      </div>

      {graduated.length
        ? graduated.map(habit => <div className="graduated-row" key={habit.id}>
            <span>{habit.emoji}</span>
            <strong>{habit.title}</strong>
            <span className="graduated-check"><Icon name="check" size={15} /></span>
          </div>)
        : <p className="muted small-note">A graduated habit will be celebrated here when practice becomes independence.</p>}
    </section>

    {showModal && <Modal onClose={() => setShowModal(false)} onSave={habit => {
      addHabit(habit)
      setShowModal(false)
    }} />}

    {graduationCandidate && <div className="modal-backdrop" role="presentation" onClick={() => setGraduationCandidate(null)}>
      <section className="modal-card graduation-modal" role="dialog" aria-modal="true" aria-labelledby="graduation-title" onClick={event => event.stopPropagation()}>
        <div className="graduation-modal-icon">🎓</div>
        <span className="eyebrow">READY TO GRADUATE</span>
        <h2 id="graduation-title">{graduationCandidate.habit.title}</h2>
        <p className="muted">
          {state.child.name} completed {graduationCandidate.progress.completed} of {graduationCandidate.progress.opportunities} scheduled practices,
          with {graduationCandidate.progress.last30Rate}% consistency across the latest 30.
        </p>
        <div className="graduation-question">
          <strong>Has {state.child.name} started doing this independently?</strong>
          <small>Graduation removes the habit from the daily list and adds it to “Things I Can Do By Myself”.</small>
        </div>
        <button className="button button-primary button-full" onClick={confirmGraduation}>Yes, graduate this habit</button>
        <button className="button button-secondary button-full" onClick={() => setGraduationCandidate(null)}>Keep practicing</button>
      </section>
    </div>}
  </div>
}
