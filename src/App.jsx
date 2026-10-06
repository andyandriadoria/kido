import { useState } from 'react'
import { useKidoStore } from './hooks/useKidoStore.js'
import { getLocalDateKey, withHabitDefaults } from './domain/habits.js'
import TopBar from './components/TopBar.jsx'
import BottomNav from './components/BottomNav.jsx'
import ParentPinModal from './components/ParentPinModal.jsx'
import LandingScreen from './screens/LandingScreen.jsx'
import { AddChildScreen, ChooseGoalsScreen, StarterRoutineScreen } from './screens/OnboardingScreens.jsx'
import ParentHomeScreen from './screens/ParentHomeScreen.jsx'
import HabitsScreen from './screens/HabitsScreen.jsx'
import KidTodayScreen from './screens/KidTodayScreen.jsx'
import KidJourneyScreen from './screens/KidJourneyScreen.jsx'

export default function App() {
  const {
    state,
    update,
    requestHabit,
    approveHabit,
    declineHabit,
    addHabit,
    graduateHabit,
  } = useKidoStore()

  const [screen, setScreen] = useState(() => state.setupComplete ? 'kid-today' : 'landing')
  const [draftChild, setDraftChild] = useState(state.child)
  const [draftGoals, setDraftGoals] = useState(state.goals)
  const [mode, setMode] = useState(() => state.setupComplete ? 'kid' : 'parent')
  const [pinDialog, setPinDialog] = useState(() => state.setupComplete && !state.parentPin ? 'setup' : null)

  const startRoutine = included => {
    const startedAt = getLocalDateKey()
    update({
      child: draftChild,
      goals: draftGoals,
      habits: included.map(habit => withHabitDefaults({ ...habit, startedAt })),
      setupComplete: true,
      xp: 0,
    })
    setMode('parent')
    setScreen('parent-home')
    setPinDialog('setup')
  }

  const switchMode = nextMode => {
    if (nextMode === mode) return

    if (nextMode === 'parent') {
      setPinDialog(state.parentPin ? 'verify' : 'setup')
      return
    }

    setMode('kid')
    setScreen('kid-today')
  }

  const handlePinSuccess = pin => {
    if (pinDialog === 'setup') update({ parentPin: pin })
    setPinDialog(null)
    setMode('parent')
    setScreen('parent-home')
  }

  const handleApprove = (id, approve = true) => {
    if (approve) approveHabit(id)
    else declineHabit(id)
  }

  if (screen === 'landing') {
    return <div className="app-frame landing-frame"><LandingScreen onStart={() => setScreen('add-child')} /></div>
  }

  if (screen === 'add-child') {
    return <div className="app-frame"><AddChildScreen child={draftChild} setChild={setDraftChild} onNext={() => setScreen('choose-goals')} onBack={() => setScreen('landing')} /></div>
  }

  if (screen === 'choose-goals') {
    return <div className="app-frame"><ChooseGoalsScreen selected={draftGoals} setSelected={setDraftGoals} onNext={() => setScreen('starter-routine')} onBack={() => setScreen('add-child')} /></div>
  }

  if (screen === 'starter-routine') {
    return <div className="app-frame"><StarterRoutineScreen selected={draftGoals} onStart={startRoutine} onBack={() => setScreen('choose-goals')} /></div>
  }

  const screenTitle = screen === 'kid-journey'
    ? (mode === 'parent' ? 'Progress' : 'Journey')
    : { 'parent-home': 'Home', habits: 'Habits', 'kid-today': 'Today' }[screen]

  const mainScreen = {
    'parent-home': <ParentHomeScreen state={state} onApprove={handleApprove} setScreen={setScreen} />,
    habits: <HabitsScreen state={state} addHabit={addHabit} graduateHabit={graduateHabit} />,
    'kid-today': <KidTodayScreen state={state} onPractice={requestHabit} setScreen={setScreen} />,
    'kid-journey': <KidJourneyScreen state={state} setScreen={setScreen} mode={mode} />,
  }[screen] || <ParentHomeScreen state={state} onApprove={handleApprove} setScreen={setScreen} />

  return <div className={`app-frame app-mode-${mode}`}>
    <TopBar title={screenTitle} mode={mode} setMode={switchMode} child={state.child} onBack={() => setScreen('parent-home')} />
    <main className="screen-main">{mainScreen}</main>
    <BottomNav screen={screen} setScreen={setScreen} mode={mode} />
    {pinDialog && <ParentPinModal mode={pinDialog} savedPin={state.parentPin} onSuccess={handlePinSuccess} />}
  </div>
}
