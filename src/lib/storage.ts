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
