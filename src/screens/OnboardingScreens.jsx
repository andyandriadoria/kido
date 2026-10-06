import { useMemo, useState } from 'react'
import { GOALS, STARTER_HABITS } from '../data/constants.js'
import Icon from '../components/Icon.jsx'

function pickStarterHabits(selected) {
  const byGoal = selected.map(goal => STARTER_HABITS.filter(habit => habit.goal === goal))
  const chosen = []

  byGoal.forEach(list => {
    if (list[0]) chosen.push(list[0])
  })

  byGoal.forEach(list => {
    if (chosen.length < 4 && list[1]) chosen.push(list[1])
  })

  return chosen.slice(0, 4)
}

export function AddChildScreen({ child, setChild, onNext, onBack }) {
  return <OnboardingFrame step={1} onBack={onBack}>
    <div className="onboarding-illustration child-illustration">
      <span className="illustration-spark">✦</span>
      <div className="avatar-face">{child.avatar}</div>
      <span className="illustration-orb">☀</span>
    </div>

    <span className="eyebrow">MULAI DARI SI KECIL</span>
    <h1>Siapa yang akan<br/>bertumbuh bersama KIDO?</h1>
    <p className="muted">Kita mulai dari nama panggilan, usia, dan teman kecilnya.</p>

    <label className="field-label" htmlFor="child-name">Nama panggilan anak</label>
    <input id="child-name" value={child.name} maxLength="24" placeholder="Contoh: Bian" onChange={event => setChild({ ...child, name: event.target.value })} />

    <label className="field-label" htmlFor="child-age">Usia</label>
    <select id="child-age" value={child.age} onChange={event => setChild({ ...child, age: Number(event.target.value) })}>
      {Array.from({ length: 7 }, (_, i) => i + 6).map(age => <option key={age} value={age}>{age} tahun</option>)}
    </select>

    <span className="field-label">Pilih teman kecil</span>
    <div className="avatar-options">
      {['🦊','🐻','🐼','🐰','🐯','🦄'].map(avatar => <button key={avatar} className={`avatar-option ${child.avatar === avatar ? 'chosen' : ''}`} onClick={() => setChild({ ...child, avatar })} aria-label={`Pilih ${avatar}`}>{avatar}</button>)}
    </div>

    <button className="button button-primary button-full onboarding-cta" disabled={!child.name.trim()} onClick={onNext}>Lanjut <Icon name="arrow" /></button>
  </OnboardingFrame>
}

export function ChooseGoalsScreen({ selected, setSelected, onNext, onBack }) {
  const toggle = id => setSelected(selected.includes(id)
    ? selected.filter(item => item !== id)
    : selected.length < 3 ? [...selected, id] : selected)

  return <OnboardingFrame step={2} onBack={onBack}>
    <span className="eyebrow">PILIH YANG PALING PENTING</span>
    <h1>Apa yang ingin<br/>dibiasakan lebih dulu?</h1>
    <p className="muted">Pilih 1–3 area. KIDO akan membuat starter routine yang singkat.</p>

    <div className="goal-list">
      {GOALS.map(goal => <button key={goal.id} onClick={() => toggle(goal.id)} className={`goal-option ${selected.includes(goal.id) ? 'chosen' : ''}`} aria-pressed={selected.includes(goal.id)}>
        <span className="goal-emoji">{goal.emoji}</span>
        <span className="goal-text"><strong>{goal.label}</strong><small>{goal.helper}</small></span>
        <span className="selection-check">{selected.includes(goal.id) && <Icon name="check" size={16} />}</span>
      </button>)}
    </div>

    <div className="selection-count">{selected.length} dari 3 dipilih</div>
    <button className="button button-primary button-full onboarding-cta" disabled={!selected.length} onClick={onNext}>Buat starter routine <Icon name="arrow" /></button>
  </OnboardingFrame>
}

export function StarterRoutineScreen({ selected, onStart, onBack }) {
  const habits = useMemo(() => pickStarterHabits(selected), [selected])
  const [included, setIncluded] = useState(habits.map(habit => habit.id))

  const toggle = id => setIncluded(included.includes(id)
    ? included.filter(item => item !== id)
    : [...included, id])

  return <OnboardingFrame step={3} onBack={onBack}>
    <div className="routine-banner">
      <div><span className="eyebrow">STARTER ROUTINE</span><h1>Mulai kecil.<br/>Biar konsisten.</h1></div>
      <div className="routine-sun">☀️</div>
    </div>
    <p className="muted">KIDO membatasi starter routine maksimal 4 kebiasaan. Tambah lagi nanti kalau ritmenya sudah nyaman.</p>

    <div className="routine-list">
      {habits.map((habit, index) => <button key={habit.id} className={`routine-item ${included.includes(habit.id) ? 'included' : ''}`} onClick={() => toggle(habit.id)}>
        <span className="routine-number">{String(index + 1).padStart(2, '0')}</span>
        <span className="routine-emoji">{habit.emoji}</span>
        <span className="routine-name">
          {habit.title}
          <small>{habit.xpValue} XP · {habit.approvalRequired ? 'perlu dicek orang tua' : 'cek sendiri'}</small>
        </span>
        <span className="routine-toggle">{included.includes(habit.id) ? '✓' : '+'}</span>
      </button>)}
    </div>

    <div className="tip-card"><span>💡</span><p>Tiga kebiasaan yang benar-benar dijalankan lebih baik daripada daftar panjang yang cepat ditinggalkan.</p></div>
    <button className="button button-primary button-full onboarding-cta" disabled={!included.length} onClick={() => onStart(habits.filter(habit => included.includes(habit.id)))}>Lanjut & buat PIN <Icon name="arrow" /></button>
  </OnboardingFrame>
}

function OnboardingFrame({ children, step, onBack }) {
  return <main className="onboarding-page">
    <header className="onboarding-top">
      <button className="icon-button" onClick={onBack} aria-label="Kembali"><Icon name="back" /></button>
      <div className="step-progress">{[1,2,3].map(number => <span key={number} className={number <= step ? 'filled' : ''} />)}</div>
      <span className="step-count">{String(step).padStart(2, '0')}/03</span>
    </header>
    <section className="onboarding-content">{children}</section>
  </main>
}
