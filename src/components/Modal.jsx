import { useState } from 'react'
import Icon from './Icon.jsx'
import { ALL_DAYS, WEEKDAYS } from '../domain/habits.js'

export default function Modal({ onClose, onSave }) {
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('Morning')
  const [days, setDays] = useState(ALL_DAYS)
  const [xpValue, setXpValue] = useState(10)
  const [approvalRequired, setApprovalRequired] = useState(false)

  const toggleDay = value => {
    setDays(current => current.includes(value)
      ? current.filter(day => day !== value)
      : [...current, value])
  }

  return <div className="modal-backdrop" role="presentation" onClick={onClose}>
    <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={event => event.stopPropagation()}>
      <div className="modal-top">
        <span className="eyebrow">A small step at a time</span>
        <button className="icon-button" onClick={onClose} aria-label="Close"><Icon name="close" /></button>
      </div>
      <h2 id="modal-title">Add a habit</h2>
      <p className="muted">Keep it simple, clear, and easy to practice.</p>

      <label className="field-label" htmlFor="habit-name">Habit name</label>
      <input id="habit-name" autoFocus placeholder="e.g. Put my shoes away" maxLength="48" value={title} onChange={event => setTitle(event.target.value)} />

      <label className="field-label" htmlFor="habit-time">When?</label>
      <select id="habit-time" value={time} onChange={event => setTime(event.target.value)}>
        <option>Morning</option>
        <option>Afternoon</option>
        <option>Evening</option>
        <option>Anytime</option>
      </select>

      <span className="field-label">Practice days</span>
      <div className="weekday-picker">
        {WEEKDAYS.map(day => <button
          type="button"
          key={day.label}
          className={days.includes(day.value) ? 'selected' : ''}
          aria-pressed={days.includes(day.value)}
          aria-label={day.label}
          onClick={() => toggleDay(day.value)}
        >{day.short}</button>)}
      </div>

      <label className="field-label" htmlFor="habit-xp">Effort</label>
      <select id="habit-xp" value={xpValue} onChange={event => setXpValue(Number(event.target.value))}>
        <option value="5">Small · +5 XP</option>
        <option value="10">Normal · +10 XP</option>
        <option value="20">Extra · +20 XP</option>
      </select>

      <label className="approval-toggle">
        <input type="checkbox" checked={approvalRequired} onChange={event => setApprovalRequired(event.target.checked)} />
        <span>
          <strong>Parent approval</strong>
          <small>Use this for habits a grown-up should check.</small>
        </span>
      </label>

      <button
        className="button button-primary button-full"
        disabled={!title.trim() || !days.length}
        onClick={() => onSave({
          id: `habit-${Date.now()}`,
          title: title.trim(),
          emoji: '✨',
          time,
          goal: 'independence',
          days,
          xpValue,
          approvalRequired,
        })}
      >
        Add to routine <Icon name="arrow" />
      </button>
    </section>
  </div>
}
