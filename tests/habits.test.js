import test from 'node:test'
import assert from 'node:assert/strict'
import {
  ALL_DAYS,
  calculateStreak,
  getHabitProgress,
  getLevelInfo,
  isHabitScheduledOn,
} from '../src/domain/habits.js'

function habit(overrides = {}) {
  return {
    id: 'test',
    title: 'Test habit',
    emoji: '✨',
    time: 'Anytime',
    goal: 'independence',
    days: ALL_DAYS,
    xpValue: 10,
    approvalRequired: false,
    startedAt: '2026-10-01',
    pendingDate: null,
    doneDates: [],
    paused: false,
    pausePeriods: [],
    archived: false,
    archivedAt: null,
    graduated: false,
    graduatedAt: null,
    ...overrides,
  }
}

test('weekday schedules exclude weekends', () => {
  const schoolHabit = habit({ days: [1, 2, 3, 4, 5] })
  assert.equal(isHabitScheduledOn(schoolHabit, new Date(2026, 9, 5)), true)
  assert.equal(isHabitScheduledOn(schoolHabit, new Date(2026, 9, 4)), false)
})

test('paused date ranges are removed from scheduled opportunities', () => {
  const pausedHabit = habit({
    pausePeriods: [{ start: '2026-10-03', end: '2026-10-05' }],
  })

  assert.equal(isHabitScheduledOn(pausedHabit, new Date(2026, 9, 2)), true)
  assert.equal(isHabitScheduledOn(pausedHabit, new Date(2026, 9, 4)), false)
  assert.equal(isHabitScheduledOn(pausedHabit, new Date(2026, 9, 6)), true)
})

test('streak counts completed scheduled days before an unfinished today', () => {
  const streakHabit = habit({
    doneDates: ['2026-10-03', '2026-10-04', '2026-10-05'],
  })
  assert.equal(calculateStreak([streakHabit], new Date(2026, 9, 6)), 3)
})

test('habit becomes ready after 30 opportunities at 85 percent or better', () => {
  const doneDates = []
  const cursor = new Date(2026, 8, 7)

  for (let i = 0; i < 26; i += 1) {
    doneDates.push([
      cursor.getFullYear(),
      String(cursor.getMonth() + 1).padStart(2, '0'),
      String(cursor.getDate()).padStart(2, '0'),
    ].join('-'))
    cursor.setDate(cursor.getDate() + 1)
  }

  const progress = getHabitProgress(habit({
    startedAt: '2026-09-07',
    doneDates,
  }), new Date(2026, 9, 6))

  assert.equal(progress.opportunities, 30)
  assert.equal(progress.last30Rate, 87)
  assert.equal(progress.stage, 'ready')
  assert.equal(progress.ready, true)
})

test('level information is derived from XP', () => {
  const level = getLevelInfo(450)
  assert.equal(level.level, 3)
  assert.equal(level.progressXp, 50)
  assert.equal(level.nextIn, 150)
})
