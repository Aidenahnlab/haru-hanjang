import { SLOTS, type SlotId } from './slots'

export type Todo = { id: string; text: string; done: boolean }
export type Sheet = { date: string; slots: Record<SlotId, Todo[]> }

const PREFIX = 'haruhanjang:'

export function emptySheet(date: string): Sheet {
  const slots = Object.fromEntries(SLOTS.map((s) => [s.id, []])) as unknown as Sheet['slots']
  return { date, slots }
}

export function loadSheet(date: string): Sheet {
  try {
    const raw = localStorage.getItem(`${PREFIX}sheet:${date}`)
    if (!raw) return emptySheet(date)
    const saved = JSON.parse(raw) as Sheet
    return { date, slots: { ...emptySheet(date).slots, ...saved.slots } }
  } catch {
    return emptySheet(date)
  }
}

// 흉내: 저장 실패 — 주소 끝에 ?save=fail을 붙이면 저장이 막힌 것처럼 동작 (SETUP)
const mockSaveFail = new URLSearchParams(location.search).get('save') === 'fail'

/** 저장에 성공하면 true. 사생활 보호 모드·저장 공간 가득이면 false */
export function saveSheet(sheet: Sheet): boolean {
  try {
    if (mockSaveFail) throw new Error('mock save fail')
    localStorage.setItem(`${PREFIX}sheet:${sheet.date}`, JSON.stringify(sheet))
    return true
  } catch {
    return false
  }
}

export function newId(): string {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

/** 첫 긋기 한마디를 이미 보여줬는지 — 맨 처음 한 번만 보여준다 */
export function hasSeenFirstStrike(): boolean {
  try {
    return localStorage.getItem(`${PREFIX}firstStrikeSeen`) === '1'
  } catch {
    return false
  }
}

export function markFirstStrikeSeen() {
  try {
    if (!mockSaveFail) localStorage.setItem(`${PREFIX}firstStrikeSeen`, '1')
  } catch {
    // 저장이 막혀도 이번 화면에서는 다시 띄우지 않는다 (useSheet가 기억)
  }
}

/** 엔터 없이 앱을 닫아도 남도록, 입력줄에 적던 글을 따로 적어 둔다 (F1 ② 예외) */
type Draft = { date: string; slot: SlotId; text: string }

export function saveDraft(draft: Draft | null) {
  try {
    if (mockSaveFail) return
    if (draft && draft.text.trim()) localStorage.setItem(`${PREFIX}draft`, JSON.stringify(draft))
    else localStorage.removeItem(`${PREFIX}draft`)
  } catch {
    // 저장이 막히면 적던 글은 이번 화면에만 남는다
  }
}

/** 지난번에 적다 만 글이 있으면 그 날 장의 그 칸에 할 일로 옮겨 적는다 */
export function applyPendingDraft() {
  try {
    const raw = localStorage.getItem(`${PREFIX}draft`)
    if (!raw) return
    localStorage.removeItem(`${PREFIX}draft`)
    const draft = JSON.parse(raw) as Draft
    const text = draft.text.trim()
    if (!text || !SLOTS.some((s) => s.id === draft.slot)) return
    const sheet = loadSheet(draft.date)
    sheet.slots[draft.slot] = [...sheet.slots[draft.slot], { id: newId(), text, done: false }]
    saveSheet(sheet)
  } catch {
    // 알아볼 수 없는 글이면 버린다
  }
}
