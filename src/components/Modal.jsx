import { useState } from 'react'
import Icon from './Icon.jsx'
export default function Modal({ onClose, onSave }) {
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('Morning')
  return <div className="modal-backdrop" role="presentation" onClick={onClose}>
    <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={event => event.stopPropagation()}>
      <div className="modal-top"><span className="eyebrow">A small step at a time</span><button className="icon-button" onClick={onClose} aria-label="Close"><Icon name="close" /></button></div>
      <h2 id="modal-title">Add a habit</h2><p className="muted">Keep it simple, clear, and easy to practice.</p>
      <label className="field-label" htmlFor="habit-name">Habit name</label>
      <input id="habit-name" autoFocus placeholder="e.g. Put my shoes away" maxLength="48" value={title} onChange={event => setTitle(event.target.value)} />
      <label className="field-label" htmlFor="habit-time">When?</label>
      <select id="habit-time" value={time} onChange={event => setTime(event.target.value)}><option>Morning</option><option>Afternoon</option><option>Evening</option><option>Anytime</option></select>
      <button className="button button-primary button-full" disabled={!title.trim()} onClick={() => onSave({ id: `habit-${Date.now()}`, title: title.trim(), emoji: '✨', time, goal: 'healthy' })}>Add to routine <Icon name="arrow" /></button>
    </section>
  </div>
}
