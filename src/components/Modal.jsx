import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'
import { ALL_DAYS, TIME_LABELS, WEEKDAYS } from '../domain/habits.js'

const EMPTY = {
  title: '',
  emoji: '✨',
  time: 'Morning',
  days: ALL_DAYS,
  xpValue: 10,
  approvalRequired: false,
}

export default function Modal({
  initialHabit = null,
  isNew = true,
  onClose,
  onSave,
  onTogglePause,
  onArchive,
}) {
  const source = initialHabit || EMPTY
  const [title, setTitle] = useState(source.title || '')
  const [time, setTime] = useState(source.time || 'Morning')
  const [days, setDays] = useState(source.days?.length ? source.days : ALL_DAYS)
  const [xpValue, setXpValue] = useState(source.xpValue || 10)
  const [approvalRequired, setApprovalRequired] = useState(Boolean(source.approvalRequired))

  useEffect(() => {
    setTitle(source.title || '')
    setTime(source.time || 'Morning')
    setDays(source.days?.length ? source.days : ALL_DAYS)
    setXpValue(source.xpValue || 10)
    setApprovalRequired(Boolean(source.approvalRequired))
  }, [initialHabit])

  const toggleDay = value => {
    setDays(current => current.includes(value)
      ? current.filter(day => day !== value)
      : [...current, value])
  }

  const save = () => {
    onSave({
      ...source,
      id: isNew ? `habit-${Date.now()}` : source.id,
      title: title.trim(),
      emoji: source.emoji || '✨',
      time,
      days,
      xpValue,
      approvalRequired,
    })
  }

  return <div className="modal-backdrop" role="presentation" onClick={onClose}>
    <section className="modal-card habit-editor-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={event => event.stopPropagation()}>
      <div className="modal-top">
        <div>
          <span className="eyebrow">{isNew ? 'KEBIASAAN BARU' : 'ATUR KEBIASAAN'}</span>
          <h2 id="modal-title">{isNew ? 'Sesuaikan kebiasaan' : source.title}</h2>
        </div>
        <button className="icon-button" onClick={onClose} aria-label="Tutup"><Icon name="close" /></button>
      </div>
      <p className="muted">{isNew ? 'Default KIDO sudah cukup untuk mulai. Ubah hanya yang dibutuhkan.' : 'Ubah jadwal, persetujuan, atau jeda kebiasaan ini.'}</p>

      <label className="field-label" htmlFor="habit-name">Nama kebiasaan</label>
      <input id="habit-name" placeholder="Contoh: Rapikan sepatu" maxLength="48" value={title} onChange={event => setTitle(event.target.value)} />

      <label className="field-label" htmlFor="habit-time">Waktu</label>
      <select id="habit-time" value={time} onChange={event => setTime(event.target.value)}>
        {Object.entries(TIME_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
      </select>

      <span className="field-label">Hari latihan</span>
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

      <label className="field-label" htmlFor="habit-xp">Tingkat usaha</label>
      <select id="habit-xp" value={xpValue} onChange={event => setXpValue(Number(event.target.value))}>
        <option value="5">Ringan · +5 XP</option>
        <option value="10">Normal · +10 XP</option>
        <option value="20">Lebih menantang · +20 XP</option>
      </select>

      <label className="approval-toggle">
        <input type="checkbox" checked={approvalRequired} onChange={event => setApprovalRequired(event.target.checked)} />
        <span>
          <strong>Perlu persetujuan orang tua</strong>
          <small>Aktifkan hanya untuk kebiasaan yang memang perlu dicek.</small>
        </span>
      </label>

      <button className="button button-primary button-full" disabled={!title.trim() || !days.length} onClick={save}>
        {isNew ? 'Tambahkan kebiasaan' : 'Simpan perubahan'} <Icon name="arrow" />
      </button>

      {!isNew && <div className="habit-editor-actions">
        <button className="button button-secondary" onClick={onTogglePause}>
          {source.paused ? 'Lanjutkan kebiasaan' : 'Jeda sementara'}
        </button>
        <button className="archive-button" onClick={onArchive}>Arsipkan</button>
      </div>}
    </section>
  </div>
}
