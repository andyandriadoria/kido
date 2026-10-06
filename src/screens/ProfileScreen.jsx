import ScreenHeader from '../components/ScreenHeader.jsx'
import Icon from '../components/Icon.jsx'

export default function ProfileScreen({ state, setScreen, mode = 'parent' }) {
  const activeHabits = state.habits.filter(habit => !habit.graduated)
  const graduatedHabits = state.habits.filter(habit => habit.graduated)

  if (mode === 'kid') return <div className="app-content kid-content">
    <ScreenHeader eyebrow="YOUR SPACE" title={`This is you, ${state.child.name}`} subtitle="Every little step is part of your story." />
    <section className="profile-hero kid-profile-hero"><span className="profile-avatar">{state.child.avatar}</span><div><span className="eyebrow">LEVEL 2</span><h2>{state.child.name}</h2><p>Brave Beginner · {state.xp} XP</p></div><span className="profile-star">⭐</span></section>
    <section className="section-block profile-summary"><div><span className="eyebrow">YOUR GROWING ROUTINE</span><strong>{activeHabits.length} habits to practice</strong></div><span className="count-pill">{graduatedHabits.length} skills</span></section>
    <button className="profile-link-card" onClick={() => setScreen('kid-journey')}><span className="profile-link-icon">🌱</span><span><small>YOUR JOURNEY</small><strong>See how you’re growing</strong></span><Icon name="arrow" size={17}/></button>
    <div className="profile-note">Small steps count. You’re learning more every day.</div>
  </div>

  return <div className="app-content">
    <ScreenHeader eyebrow="PARENT SPACE" title="Family profile" subtitle="A little space for your child’s growing routine." />
    <section className="profile-hero"><span className="profile-avatar">{state.child.avatar}</span><div><span className="eyebrow">CHILD PROFILE</span><h2>{state.child.name}</h2><p>{state.child.age} years old · Brave Beginner</p></div></section>
    <section className="section-block profile-summary"><div><span className="eyebrow">CURRENT ROUTINE</span><strong>{activeHabits.length} habits in practice</strong></div><span className="count-pill green">{graduatedHabits.length} skills</span></section>
    <div className="profile-actions">
      <button className="profile-link-card" onClick={() => setScreen('habits')}><span className="profile-link-icon">🌤️</span><span><small>DAILY ROUTINE</small><strong>Manage habits</strong></span><Icon name="arrow" size={17}/></button>
      <button className="profile-link-card" onClick={() => setScreen('kid-journey')}><span className="profile-link-icon">📈</span><span><small>PROGRESS</small><strong>View independence path</strong></span><Icon name="arrow" size={17}/></button>
    </div>
    <div className="profile-note">KIDO helps small habits grow into skills a child can do independently.</div>
  </div>
}
