import { ALL_DAYS } from '../domain/habits.js'

export const GOALS = [
  { id: 'morning', label: 'Rutinitas pagi', emoji: '🌤️', helper: 'Mulai hari dengan lebih teratur' },
  { id: 'reading', label: 'Membaca', emoji: '📚', helper: 'Bangun kebiasaan membaca' },
  { id: 'school', label: 'Tanggung jawab sekolah', emoji: '🎒', helper: 'Siapkan kebutuhan sekolah sendiri' },
  { id: 'hygiene', label: 'Kebersihan diri', emoji: '🪥', helper: 'Belajar merawat diri' },
  { id: 'chores', label: 'Membantu di rumah', emoji: '🧺', helper: 'Ambil bagian dalam tugas rumah' },
  { id: 'healthy', label: 'Kebiasaan sehat', emoji: '💧', helper: 'Rawat tubuh setiap hari' },
]

const WEEKDAYS = [1, 2, 3, 4, 5]

export const STARTER_HABITS = [
  { id: 'bed', title: 'Rapikan tempat tidur', emoji: '🛏️', time: 'Morning', goal: 'morning', days: ALL_DAYS, xpValue: 5, approvalRequired: false },
  { id: 'dress', title: 'Bersiap sendiri', emoji: '👕', time: 'Morning', goal: 'morning', days: ALL_DAYS, xpValue: 10, approvalRequired: false },
  { id: 'read', title: 'Baca selama 10 menit', emoji: '📚', time: 'Anytime', goal: 'reading', days: ALL_DAYS, xpValue: 20, approvalRequired: true },
  { id: 'story', title: 'Ceritakan yang sudah dibaca', emoji: '💬', time: 'Evening', goal: 'reading', days: ALL_DAYS, xpValue: 10, approvalRequired: true },
  { id: 'bag', title: 'Siapkan tas sekolah', emoji: '🎒', time: 'Evening', goal: 'school', days: WEEKDAYS, xpValue: 10, approvalRequired: false },
  { id: 'schedule', title: 'Cek jadwal sekolah besok', emoji: '🗓️', time: 'Evening', goal: 'school', days: WEEKDAYS, xpValue: 10, approvalRequired: false },
  { id: 'teeth', title: 'Sikat gigi', emoji: '🪥', time: 'Morning', goal: 'hygiene', days: ALL_DAYS, xpValue: 5, approvalRequired: false },
  { id: 'tidy', title: 'Kembalikan barang ke tempatnya', emoji: '🧺', time: 'Evening', goal: 'chores', days: ALL_DAYS, xpValue: 10, approvalRequired: true },
  { id: 'water', title: 'Minum air yang cukup', emoji: '💧', time: 'Anytime', goal: 'healthy', days: ALL_DAYS, xpValue: 5, approvalRequired: false },
  { id: 'move', title: 'Bergerak selama 15 menit', emoji: '🏃', time: 'Afternoon', goal: 'healthy', days: ALL_DAYS, xpValue: 10, approvalRequired: true },
]

export const HABIT_LIBRARY = [
  ...STARTER_HABITS,
  { id: 'breakfast', title: 'Sarapan sebelum beraktivitas', emoji: '🥣', time: 'Morning', goal: 'healthy', days: ALL_DAYS, xpValue: 5, approvalRequired: false },
  { id: 'desk', title: 'Rapikan meja belajar', emoji: '🧹', time: 'Evening', goal: 'chores', days: ALL_DAYS, xpValue: 10, approvalRequired: true },
  { id: 'homework', title: 'Cek tugas sekolah', emoji: '✏️', time: 'Afternoon', goal: 'school', days: WEEKDAYS, xpValue: 10, approvalRequired: true },
  { id: 'clothes', title: 'Siapkan baju untuk besok', emoji: '👚', time: 'Evening', goal: 'independence', days: ALL_DAYS, xpValue: 10, approvalRequired: false },
  { id: 'help-table', title: 'Bantu siapkan meja makan', emoji: '🍽️', time: 'Evening', goal: 'chores', days: ALL_DAYS, xpValue: 10, approvalRequired: true },
]
