export const GOALS = [
  { id: 'morning', label: 'Morning routine', emoji: '🌤️', helper: 'Start the day smoothly' },
  { id: 'reading', label: 'Reading', emoji: '📚', helper: 'Make room for stories' },
  { id: 'school', label: 'School responsibility', emoji: '🎒', helper: 'Get ready with confidence' },
  { id: 'hygiene', label: 'Hygiene', emoji: '🪥', helper: 'Care for body and self' },
  { id: 'chores', label: 'Home chores', emoji: '🧺', helper: 'Help out at home' },
  { id: 'healthy', label: 'Healthy habits', emoji: '💧', helper: 'Feel good every day' },
]

export const STARTER_HABITS = [
  { id: 'bed', title: 'Make my bed', emoji: '🛏️', time: 'Morning', goal: 'morning' },
  { id: 'teeth', title: 'Brush my teeth', emoji: '🪥', time: 'Morning', goal: 'hygiene' },
  { id: 'bag', title: 'Pack my school bag', emoji: '🎒', time: 'Morning', goal: 'school' },
  { id: 'read', title: 'Read for 10 minutes', emoji: '📚', time: 'Anytime', goal: 'reading' },
]

// A habit needs repeated, parent-approved practice before it can graduate.
export const GRADUATION_PRACTICE_DAYS = 7

export const NAV_ITEMS = [
  { id: 'parent-home', label: 'Home', icon: '⌂', mode: 'parent' },
  { id: 'habits', label: 'Habits', icon: '◷', mode: 'parent' },
  { id: 'kid-today', label: 'Today', icon: '✳', mode: 'kid' },
  { id: 'kid-journey', label: 'Journey', icon: '⌁', mode: 'kid' },
]

export function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
