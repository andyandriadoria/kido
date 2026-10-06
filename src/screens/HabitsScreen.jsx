import { useState } from 'react'
import ScreenHeader from '../components/ScreenHeader.jsx'
import Icon from '../components/Icon.jsx'
import Modal from '../components/Modal.jsx'
import { GRADUATION_PRACTICE_DAYS } from '../data/constants.js'

export default function HabitsScreen({ state, addHabit, patchHabit }) {
  const [showModal, setShowModal] = useState(false)
  const [graduationTarget, setGraduationTarget] = useState(null)
  const [filter, setFilter] = useState('All habits')
  const active = state.habits.filter(habit => !habit.graduated)
  const filtered = active.filter(habit => filter === 'All habits' || habit.time.toLowerCase() === filter.toLowerCase())
  const graduated = state.habits.filter(habit => habit.graduated)
  return <div className="app-content">
    <ScreenHeader eyebrow="PARENT SPACE" title="Habits that stick" subtitle="A few small practices make a big difference." action={<button className="add-button" onClick={() => setShowModal(true)}><Icon name="plus" size={17}/> Add</button>} />
    <div className="habit-filter">{['All habits', 'Morning', 'Evening', 'Anytime'].map(item => <button key={item} className={filter === item ? 'filter-selected' : ''} onClick={() => setFilter(item)}>{item}{item === 'All habits' && <span>{active.length}</span>}</button>)}</div>
    <section className="habit-list">{filtered.map(habit => <article className="habit-card" key={habit.id}><div className="habit-card-icon">{habit.emoji}</div><div className="habit-card-body"><div className="habit-meta"><span>{habit.time.toUpperCase()}</span>{habit.status === 'waiting' && <span className="waiting-tag">NEEDS APPROVAL</span>}</div><h3>{habit.title}</h3><div className="habit-mini-progress"><span><i style={{ width: `${Math.min(100, habit.doneDates.length / GRADUATION_PRACTICE_DAYS * 100)}%` }}/></span><small>{habit.doneDates.length} of {GRADUATION_PRACTICE_DAYS} practice days</small></div></div><button className={`habit-status ${habit.status === 'waiting' ? 'waiting' : ''}`} onClick={() => setGraduationTarget(habit)} disabled={habit.status === 'waiting'} title="Celebrate as independent" aria-label={`Celebrate ${habit.title} as independent`}><Icon name="arrow" size={17}/></button></article>)}</section>
    <div className="independence-callout"><span>🌱</span><div><strong>Independence grows with practice</strong><p>After {GRADUATION_PRACTICE_DAYS} approved practice days, you can celebrate a habit as a new skill.</p></div></div>
    <section className="section-block graduated-section"><div className="section-heading"><div><span className="eyebrow">LOOK HOW FAR THEY’VE COME</span><h2>Graduated habits</h2></div><span className="count-pill green">{graduated.length}</span></div>
      {graduated.length ? graduated.map(habit => <div className="graduated-row" key={habit.id}><span>{habit.emoji}</span><strong>{habit.title}</strong><span className="graduated-check"><Icon name="check" size={15}/></span></div>) : <p className="muted small-note">Your first independent habit will be celebrated here.</p>}
    </section>
    {showModal && <Modal onClose={() => setShowModal(false)} onSave={habit => { addHabit(habit); setShowModal(false) }}/ >}
    {graduationTarget && <div className="modal-backdrop" role="presentation" onClick={() => setGraduationTarget(null)}><section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="graduate-title" onClick={event => event.stopPropagation()}><div className="modal-top"><span className="eyebrow">{graduationTarget.doneDates.length >= GRADUATION_PRACTICE_DAYS ? 'READY TO CELEBRATE' : 'PRACTICE IN PROGRESS'}</span><button className="icon-button" onClick={() => setGraduationTarget(null)} aria-label="Close"><Icon name="close"/></button></div><h2 id="graduate-title">{graduationTarget.doneDates.length >= GRADUATION_PRACTICE_DAYS ? 'Does this feel like second nature?' : 'Keep practicing together'}</h2><p className="muted">{graduationTarget.title} has {graduationTarget.doneDates.length} of {GRADUATION_PRACTICE_DAYS} approved practice days. Repeated practice helps a habit feel familiar before it becomes independent.</p>{graduationTarget.doneDates.length >= GRADUATION_PRACTICE_DAYS ? <button className="button button-primary button-full" onClick={() => { patchHabit(graduationTarget.id, { graduated: true }); setGraduationTarget(null) }}>Celebrate independence <Icon name="check"/></button> : <button className="button button-primary button-full" onClick={() => setGraduationTarget(null)}>Continue practicing</button>}</section></div>}
  </div>
}
