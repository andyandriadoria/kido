import { useEffect, useState } from 'react'
import { STARTER_HABITS } from '../data/constants.js'
import { getHabitProgress, getLocalDateKey, withHabitDefaults } from '../domain/habits.js'

const KEY = 'kido-state-v2'
const seed = {
  setupComplete: false,
  parentPin: '',
  child: { name: '', age: 8, avatar: '🦊' },
  goals: [],
  habits: STARTER_HABITS.slice(0, 4).map(habit => withHabitDefaults(habit)),
  xp: 0,
}

function normalizeState(value = {}) {
  return {
    ...seed,
    ...value,
    child: { ...seed.child, ...(value.child || {}) },
    goals: Array.isArray(value.goals) ? value.goals : seed.goals,
    habits: Array.isArray(value.habits) ? value.habits.map(habit => withHabitDefaults(habit)) : seed.habits,
    xp: Math.max(0, Number(value.xp) || 0),
    parentPin: typeof value.parentPin === 'string' ? value.parentPin : '',
  }
}

function readState() {
  try {
    const stored = localStorage.getItem(KEY)
    return stored ? normalizeState(JSON.parse(stored)) : seed
  } catch {
    return seed
  }
}

function completeHabit(current, id, dateKey) {
  const habit = current.habits.find(item => item.id === id)
  if (!habit || habit.doneDates.includes(dateKey)) return current

  return {
    ...current,
    xp: current.xp + (habit.xpValue || 10),
    habits: current.habits.map(item => item.id === id
      ? { ...item, pendingDate: null, doneDates: [...new Set([...item.doneDates, dateKey])] }
      : item),
  }
}

export function useKidoStore() {
  const [state, setState] = useState(readState)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state))
  }, [state])

  const update = change => setState(current => normalizeState({ ...current, ...change }))

  const patchHabit = (id, change) => setState(current => ({
    ...current,
    habits: current.habits.map(habit => habit.id === id ? withHabitDefaults({ ...habit, ...change }) : habit),
  }))

  const requestHabit = id => setState(current => {
    const today = getLocalDateKey()
    const habit = current.habits.find(item => item.id === id)
    if (!habit || habit.graduated || habit.doneDates.includes(today)) return current

    if (habit.approvalRequired) {
      return {
        ...current,
        habits: current.habits.map(item => item.id === id ? { ...item, pendingDate: today } : item),
      }
    }

    return completeHabit(current, id, today)
  })

  const approveHabit = id => setState(current => {
    const habit = current.habits.find(item => item.id === id)
    if (!habit || !habit.pendingDate) return current
    return completeHabit(current, id, habit.pendingDate)
  })

  const declineHabit = id => patchHabit(id, { pendingDate: null })

  const addHabit = habit => setState(current => ({
    ...current,
    habits: [...current.habits, withHabitDefaults({ ...habit, startedAt: getLocalDateKey() })],
  }))

  const graduateHabit = id => setState(current => {
    const habit = current.habits.find(item => item.id === id)
    if (!habit || !getHabitProgress(habit).ready) return current

    return {
      ...current,
      xp: current.xp + 100,
      habits: current.habits.map(item => item.id === id
        ? { ...item, graduated: true, graduatedAt: getLocalDateKey(), pendingDate: null }
        : item),
    }
  })

  return {
    state,
    update,
    patchHabit,
    requestHabit,
    approveHabit,
    declineHabit,
    addHabit,
    graduateHabit,
  }
}
