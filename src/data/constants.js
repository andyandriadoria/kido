import { ALL_DAYS } from '../domain/habits.js'

export const GOALS = [
  { id: 'morning', label: 'Morning routine', emoji: '🌤️', helper: 'Start the day smoothly' },
  { id: 'reading', label: 'Reading', emoji: '📚', helper: 'Make room for stories' },
  { id: 'school', label: 'School responsibility', emoji: '🎒', helper: 'Get ready with confidence' },
  { id: 'hygiene', label: 'Hygiene', emoji: '🪥', helper: 'Care for body and self' },
  { id: 'chores', label: 'Home chores', emoji: '🧺', helper: 'Help out at home' },
  { id: 'healthy', label: 'Healthy habits', emoji: '💧', helper: 'Feel good every day' },
]

const WEEKDAYS = [1, 2, 3, 4, 5]

export const STARTER_HABITS = [
  { id: 'bed', title: 'Make my bed', emoji: '🛏️', time: 'Morning', goal: 'morning', days: ALL_DAYS, xpValue: 5, approvalRequired: false },
  { id: 'dress', title: 'Get ready by myself', emoji: '👕', time: 'Morning', goal: 'morning', days: ALL_DAYS, xpValue: 10, approvalRequired: false },
  { id: 'read', title: 'Read for 10 minutes', emoji: '📚', time: 'Anytime', goal: 'reading', days: ALL_DAYS, xpValue: 20, approvalRequired: true },
  { id: 'story', title: 'Tell someone what I read', emoji: '💬', time: 'Evening', goal: 'reading', days: ALL_DAYS, xpValue: 10, approvalRequired: true },
  { id: 'bag', title: 'Pack my school bag', emoji: '🎒', time: 'Evening', goal: 'school', days: WEEKDAYS, xpValue: 10, approvalRequired: false },
  { id: 'schedule', title: 'Check tomorrow’s school plan', emoji: '🗓️', time: 'Evening', goal: 'school', days: WEEKDAYS, xpValue: 10, approvalRequired: false },
  { id: 'teeth', title: 'Brush my teeth', emoji: '🪥', time: 'Morning', goal: 'hygiene', days: ALL_DAYS, xpValue: 5, approvalRequired: false },
  { id: 'tidy', title: 'Put my things back', emoji: '🧺', time: 'Evening', goal: 'chores', days: ALL_DAYS, xpValue: 10, approvalRequired: true },
  { id: 'water', title: 'Drink enough water', emoji: '💧', time: 'Anytime', goal: 'healthy', days: ALL_DAYS, xpValue: 5, approvalRequired: false },
  { id: 'move', title: 'Move my body for 15 minutes', emoji: '🏃', time: 'Anytime', goal: 'healthy', days: ALL_DAYS, xpValue: 10, approvalRequired: true },
]
