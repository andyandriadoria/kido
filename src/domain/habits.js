export const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6]
export const WEEKDAYS = [
  { value: 1, short: 'Sen', label: 'Senin' },
  { value: 2, short: 'Sel', label: 'Selasa' },
  { value: 3, short: 'Rab', label: 'Rabu' },
  { value: 4, short: 'Kam', label: 'Kamis' },
  { value: 5, short: 'Jum', label: 'Jumat' },
  { value: 6, short: 'Sab', label: 'Sabtu' },
  { value: 0, short: 'Min', label: 'Minggu' },
]

export const TIME_LABELS = {
  Morning: 'Pagi',
  Afternoon: 'Sepulang sekolah',
  Anytime: 'Kapan saja',
  Evening: 'Malam',
}

export function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function parseLocalDateKey(key) {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function addDays(date, amount) {
  const next = new Date(date)
  next.setHours(12, 0, 0, 0)
  next.setDate(next.getDate() + amount)
  return next
}

function isDateInPauseRange(dateKey, range) {
  if (!range?.start) return false
  if (dateKey < range.start) return false
  return !range.end || dateKey <= range.end
}

export function withHabitDefaults(habit, date = new Date()) {
  return {
    id: habit.id || `habit-${Date.now()}`,
    title: habit.title || 'Kebiasaan baru',
    emoji: habit.emoji || '✨',
    time: habit.time || 'Anytime',
    goal: habit.goal || 'independence',
    days: Array.isArray(habit.days) && habit.days.length ? habit.days : ALL_DAYS,
    xpValue: Number(habit.xpValue) || 10,
    approvalRequired: Boolean(habit.approvalRequired),
    startedAt: habit.startedAt || getLocalDateKey(date),
    pendingDate: habit.pendingDate || null,
    doneDates: Array.isArray(habit.doneDates) ? habit.doneDates : [],
    paused: Boolean(habit.paused),
    pausePeriods: Array.isArray(habit.pausePeriods) ? habit.pausePeriods : [],
    archived: Boolean(habit.archived),
    archivedAt: habit.archivedAt || null,
    graduated: Boolean(habit.graduated),
    graduatedAt: habit.graduatedAt || null,
  }
}

export function isHabitScheduledOn(habit, date = new Date()) {
  const normalized = withHabitDefaults(habit, date)
  const dateKey = getLocalDateKey(date)

  if (dateKey < normalized.startedAt) return false
  if (normalized.graduatedAt && dateKey >= normalized.graduatedAt) return false
  if (normalized.archivedAt && dateKey >= normalized.archivedAt) return false
  if (normalized.pausePeriods.some(range => isDateInPauseRange(dateKey, range))) return false

  return normalized.days.includes(date.getDay())
}

export function getScheduledHabitsForDate(habits, date = new Date()) {
  return habits
    .map(habit => withHabitDefaults(habit, date))
    .filter(habit => isHabitScheduledOn(habit, date))
}

export function getDailyProgress(habits, date = new Date()) {
  const dateKey = getLocalDateKey(date)
  const scheduled = getScheduledHabitsForDate(habits, date)
  const completed = scheduled.filter(habit => habit.doneDates.includes(dateKey))
  const percentage = scheduled.length ? Math.round((completed.length / scheduled.length) * 100) : 0

  return {
    dateKey,
    scheduled,
    completed,
    total: scheduled.length,
    completedCount: completed.length,
    percentage,
    goalMet: scheduled.length > 0 && percentage >= 80,
  }
}

export function calculateStreak(habits, referenceDate = new Date()) {
  const todayProgress = getDailyProgress(habits, referenceDate)
  let cursor = todayProgress.goalMet ? new Date(referenceDate) : addDays(referenceDate, -1)
  let streak = 0
  let checkedScheduledDays = 0

  for (let i = 0; i < 370 && checkedScheduledDays < 365; i += 1) {
    const progress = getDailyProgress(habits, cursor)

    if (progress.total === 0) {
      cursor = addDays(cursor, -1)
      continue
    }

    checkedScheduledDays += 1
    if (!progress.goalMet) break

    streak += 1
    cursor = addDays(cursor, -1)
  }

  return streak
}

export function getWeekSummary(habits, referenceDate = new Date()) {
  const day = referenceDate.getDay()
  const mondayOffset = day === 0 ? -6 : 1 - day
  const monday = addDays(referenceDate, mondayOffset)
  const todayKey = getLocalDateKey(referenceDate)

  const days = WEEKDAYS.map((meta, index) => {
    const date = addDays(monday, index)
    const progress = getDailyProgress(habits, date)
    return {
      ...meta,
      date,
      dateKey: progress.dateKey,
      isFuture: progress.dateKey > todayKey,
      ...progress,
    }
  })

  const elapsed = days.filter(item => !item.isFuture)
  const total = elapsed.reduce((sum, item) => sum + item.total, 0)
  const completed = elapsed.reduce((sum, item) => sum + item.completedCount, 0)
  const percentage = total ? Math.round((completed / total) * 100) : 0

  return { days, total, completed, percentage }
}

function scheduledKeysForHabit(habit, referenceDate = new Date(), maxDays = 730) {
  const normalized = withHabitDefaults(habit, referenceDate)
  const start = parseLocalDateKey(normalized.startedAt)
  const end = new Date(referenceDate)
  end.setHours(23, 59, 59, 999)
  const keys = []
  let cursor = start

  for (let i = 0; i < maxDays && cursor <= end; i += 1) {
    if (isHabitScheduledOn(normalized, cursor)) keys.push(getLocalDateKey(cursor))
    cursor = addDays(cursor, 1)
  }

  return keys
}

export function getHabitProgress(habit, referenceDate = new Date()) {
  const normalized = withHabitDefaults(habit, referenceDate)
  const opportunities = scheduledKeysForHabit(normalized, referenceDate)
  const done = new Set(normalized.doneDates)
  const completed = opportunities.filter(key => done.has(key)).length
  const completionRate = opportunities.length ? Math.round((completed / opportunities.length) * 100) : 0
  const last30 = opportunities.slice(-30)
  const last30Completed = last30.filter(key => done.has(key)).length
  const last30Rate = last30.length ? Math.round((last30Completed / last30.length) * 100) : 0

  if (normalized.graduated) {
    return {
      stage: 'graduated',
      label: 'Lulus',
      opportunities: opportunities.length,
      completed,
      completionRate,
      last30Rate,
      ready: false,
    }
  }

  let stage = 'learning'
  let label = 'Belajar'

  if (opportunities.length >= 30 && last30.length === 30 && last30Rate >= 85) {
    stage = 'ready'
    label = 'Siap lulus'
  } else if (opportunities.length >= 21 && completionRate >= 80) {
    stage = 'consistent'
    label = 'Konsisten'
  } else if (opportunities.length >= 8) {
    stage = 'building'
    label = 'Membangun'
  }

  return {
    stage,
    label,
    opportunities: opportunities.length,
    completed,
    completionRate,
    last30Rate,
    ready: stage === 'ready',
  }
}

const LEVEL_TITLES = [
  'Pemula Berani',
  'Penjelajah Kecil',
  'Pembentuk Kebiasaan',
  'Bintang Tumbuh',
  'Jago Mandiri',
  'Juara Harian',
]

export function getLevelInfo(xp = 0) {
  const safeXp = Math.max(0, Number(xp) || 0)
  const step = 200
  const level = Math.floor(safeXp / step) + 1
  const progressXp = safeXp % step
  const nextIn = step - progressXp

  return {
    level,
    title: LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)],
    progressXp,
    step,
    nextIn,
    percentage: Math.round((progressXp / step) * 100),
  }
}
