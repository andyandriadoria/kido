import { useMemo, useState } from 'react'
import Icon from './Icon.jsx'
import { GOALS, HABIT_LIBRARY } from '../data/constants.js'
import { TIME_LABELS } from '../domain/habits.js'

export default function HabitLibraryModal({ goals = [], existingHabits = [], onClose, onQuickAdd, onCustomize }) {
  const [category, setCategory] = useState('recommended')
  const activeTitles = new Set(existingHabits.filter(habit => !habit.archived && !habit.graduated).map(habit => habit.title))

  const visible = useMemo(() => {
    if (category === 'recommended') {
      const recommended = HABIT_LIBRARY.filter(habit => goals.includes(habit.goal))
      return recommended.length ? recommended : HABIT_LIBRARY.slice(0, 8)
    }
    return HABIT_LIBRARY.filter(habit => habit.goal === category)
  }, [category, goals])

  const categories = [
    { id: 'recommended', label: 'Disarankan' },
    ...GOALS.map(goal => ({ id: goal.id, label: goal.label })),
  ]

  return <div className="modal-backdrop" role="presentation" onClick={onClose}>
    <section className="modal-card library-modal" role="dialog" aria-modal="true" aria-labelledby="library-title" onClick={event => event.stopPropagation()}>
      <div className="modal-top">
        <div>
          <span className="eyebrow">HABIT LIBRARY</span>
          <h2 id="library-title">Tambah kebiasaan</h2>
        </div>
        <button className="icon-button" onClick={onClose} aria-label="Tutup"><Icon name="close" /></button>
      </div>
      <p className="muted">Pilih yang sudah siap pakai. Atur lebih lanjut hanya kalau memang perlu.</p>

      <div className="library-filters" aria-label="Kategori kebiasaan">
        {categories.map(item => <button
          key={item.id}
          className={category === item.id ? 'selected' : ''}
          onClick={() => setCategory(item.id)}
        >{item.label}</button>)}
      </div>

      <div className="library-list">
        {visible.map(template => {
          const alreadyAdded = activeTitles.has(template.title)
          return <article className="library-item" key={template.id}>
            <span className="library-emoji">{template.emoji}</span>
            <div className="library-copy">
              <strong>{template.title}</strong>
              <small>{TIME_LABELS[template.time]} · +{template.xpValue} XP{template.approvalRequired ? ' · perlu persetujuan' : ''}</small>
            </div>
            <div className="library-actions">
              <button className="library-customize" disabled={alreadyAdded} onClick={() => onCustomize(template)}>Atur</button>
              <button className="library-add" disabled={alreadyAdded} onClick={() => onQuickAdd(template)}>{alreadyAdded ? 'Sudah ada' : '+ Tambah'}</button>
            </div>
          </article>
        })}
      </div>

      <button className="button button-secondary button-full library-custom-button" onClick={() => onCustomize(null)}>
        <Icon name="plus" size={17} /> Buat kebiasaan sendiri
      </button>
    </section>
  </div>
}
