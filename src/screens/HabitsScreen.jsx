import { useState } from 'react'
import ScreenHeader from '../components/ScreenHeader.jsx'
import Icon from '../components/Icon.jsx'
import Modal from '../components/Modal.jsx'

export default function HabitsScreen({ state, addHabit, patchHabit }) {
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState('All habits')
  const active = state.habits.filter(habit => !habit.graduated)
  const filtered = active.filter(habit => filter === 'All habits' || habit.time.toLowerCase() === filter.toLowerCase())
  const graduated = state.habits.filter(habit => habit.graduated)
  return <div className="app-content">
    <ScreenHeader eyebrow="PARENT SPACE" title="Habits that stick" subtitle="A few small practices make a big difference." action={<button className="add-button" onClick={() => setShowModal(true)}><Icon name="plus" size={17}/> Add</button>} />
    <div className="habit-filter">{['All habits', 'Morning', 'Evening', 'Anytime'].map(item => <button key={item} className={filter === item ? 'filter-selected' : ''} onClick={() => setFilter(item)}>{item}{item === 'All habits' && <span>{active.length}</span>}</button>)}</div>
    <section className="habit-list">{filtered.map(habit => <article className="habit-card" key={habit.id}><div className="habit-card-icon">{habit.emoji}</div><div className="habit-card-body"><div className="habit-meta"><span>{habit.time.toUpperCase()}</span>{habit.status === 'waiting' && <span className="waiting-tag">NEEDS APPROVAL</span>}</div><h3>{habit.title}</h3><div className="habit-mini-progress"><span><i style={{ width: `${Math.min(100, habit.doneDates.length * 18)}%` }}/></span><small>{habit.doneDates.length} day{habit.doneDates.length === 1 ? '' : 's'} practiced</small></div></div><button className={`habit-status ${habit.status === 'waiting' ? 'waiting' : ''}`} onClick={() => patchHabit(habit.id, { graduated: true })} title="Celebrate as independent" aria-label={`Graduate ${habit.title}`}><Icon name={habit.status === 'waiting' ? 'cup' : 'arrow'} size={17}/></button></article>)}</section>
    <div className="independence-callout"><span>🌱</span><div><strong>Ready for more independence?</strong><p>When a habit feels like second nature, celebrate it as a new skill.</p></div></div>
    <section className="section-block graduated-section"><div className="section-heading"><div><span className="eyebrow">LOOK HOW FAR THEY’VE COME</span><h2>Graduated habits</h2></div><span className="count-pill green">{graduated.length}</span></div>
      {graduated.length ? graduated.map(habit => <div className="graduated-row" key={habit.id}><span>{habit.emoji}</span><strong>{habit.title}</strong><span className="graduated-check"><Icon name="check" size={15}/></span></div>) : <p className="muted small-note">Your first independent habit will be celebrated here.</p>}
    </section>
    {showModal && <Modal onClose={() => setShowModal(false)} onSave={habit => { addHabit(habit); setShowModal(false) }}/ >}
  </div>
}
