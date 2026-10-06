import { useEffect, useState } from 'react'
import { getLocalDateKey, GRADUATION_PRACTICE_DAYS, STARTER_HABITS } from '../data/constants.js'

const KEY = 'kido-state-v1'
const seed = {
  setupComplete: false,
  child: { name: 'Mika', age: 8, avatar: '🦊' },
  goals: ['morning', 'reading', 'school'],
  habits: STARTER_HABITS.map(habit => ({ ...habit, status: 'active', doneDates: [], graduated: false })),
  xp: 120,
  streak: 4,
}

function readState() {
  try {
    const stored = localStorage.getItem(KEY)
    if (!stored) return seed
    const parsed = { ...seed, ...JSON.parse(stored) }
    // Older demos allowed a habit to graduate after one tap. Reopen those
    // habits unless they have enough distinct approved practice days.
    parsed.habits = (parsed.habits || []).map(habit =>
      habit.graduated && (habit.doneDates?.length || 0) < GRADUATION_PRACTICE_DAYS
        ? { ...habit, graduated: false }
        : habit,
    )
    return parsed
  } catch { return seed }
}

export function useKidoStore() {
  const [state, setState] = useState(readState)
  useEffect(() => localStorage.setItem(KEY, JSON.stringify(state)), [state])
  const update = change => setState(current => ({ ...current, ...change }))
  const patchHabit = (id, change) => setState(current => ({
    ...current,
    habits: current.habits.map(habit => habit.id === id ? { ...habit, ...change } : habit),
  }))
  const requestHabit = id => patchHabit(id, { status: 'waiting' })
  const approveHabit = id => setState(current => {
    const today = getLocalDateKey()
    return {
      ...current,
      xp: current.xp + 10,
      habits: current.habits.map(item => item.id === id ? { ...item, status: 'active', doneDates: [...new Set([...item.doneDates, today])] } : item),
    }
  })
  const addHabit = habit => setState(current => ({ ...current, habits: [...current.habits, { ...habit, status: 'active', doneDates: [], graduated: false }] }))
  return { state, update, patchHabit, requestHabit, approveHabit, addHabit }
}
