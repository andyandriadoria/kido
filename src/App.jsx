import { useState } from 'react'
import { useKidoStore } from './hooks/useKidoStore.js'
import TopBar from './components/TopBar.jsx'
import BottomNav from './components/BottomNav.jsx'
import LandingScreen from './screens/LandingScreen.jsx'
import { AddChildScreen, ChooseGoalsScreen, StarterRoutineScreen } from './screens/OnboardingScreens.jsx'
import ParentHomeScreen from './screens/ParentHomeScreen.jsx'
import HabitsScreen from './screens/HabitsScreen.jsx'
import KidTodayScreen from './screens/KidTodayScreen.jsx'
import KidJourneyScreen from './screens/KidJourneyScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'

export default function App() {
  const { state, update, requestHabit, approveHabit, addHabit, patchHabit } = useKidoStore()
  const [screen, setScreen] = useState(() => state.setupComplete ? 'parent-home' : 'landing')
  const [draftChild, setDraftChild] = useState(state.child)
  const [draftGoals, setDraftGoals] = useState(state.goals)
  const [mode, setMode] = useState('parent')

  const startRoutine = included => {
    update({
      child: draftChild,
      goals: draftGoals,
      habits: included.map(habit => ({ ...habit, status: 'active', doneDates: [], graduated: false })),
      setupComplete: true,
    })
    setMode('parent')
    setScreen('parent-home')
  }
  const switchMode = nextMode => {
    setMode(nextMode)
    setScreen(nextMode === 'parent' ? 'parent-home' : 'kid-today')
  }
  const handleApprove = (id, approve = true) => approve
    ? approveHabit(id)
    : patchHabit(id, { status: 'active' })

  if (screen === 'landing') return <div className="app-frame landing-frame"><LandingScreen onStart={() => setScreen('add-child')} /></div>
  if (screen === 'add-child') return <div className="app-frame"><AddChildScreen child={draftChild} setChild={setDraftChild} onNext={() => setScreen('choose-goals')} onBack={() => setScreen('landing')} /></div>
  if (screen === 'choose-goals') return <div className="app-frame"><ChooseGoalsScreen selected={draftGoals} setSelected={setDraftGoals} onNext={() => setScreen('starter-routine')} onBack={() => setScreen('add-child')} /></div>
  if (screen === 'starter-routine') return <div className="app-frame"><StarterRoutineScreen selected={draftGoals} onStart={startRoutine} onBack={() => setScreen('choose-goals')} /></div>

  const activeMode = mode
  const screenTitle = { 'parent-home': 'Home', habits: 'Habits', 'kid-today': 'Today', 'kid-journey': 'Journey', profile: mode === 'parent' ? 'Profile' : 'Me' }[screen]
  const mainScreen = {
    'parent-home': <ParentHomeScreen state={state} onApprove={handleApprove} setScreen={setScreen} />,
    habits: <HabitsScreen state={state} addHabit={addHabit} patchHabit={patchHabit} />,
    'kid-today': <KidTodayScreen state={state} onPractice={requestHabit} setScreen={setScreen} />,
    'kid-journey': <KidJourneyScreen state={state} setScreen={setScreen} mode={activeMode} />,
    profile: <ProfileScreen state={state} setScreen={setScreen} mode={activeMode} />,
  }[screen] || <ParentHomeScreen state={state} onApprove={handleApprove} setScreen={setScreen} />

  return <div className={`app-frame app-mode-${activeMode}`}>
    <TopBar title={screenTitle} mode={activeMode} setMode={switchMode} child={state.child} onBack={() => setScreen('parent-home')} />
    <main className="screen-main">{mainScreen}</main>
    <BottomNav screen={screen} setScreen={setScreen} mode={activeMode} />
  </div>
}
