import { SLOTS } from './slots'
import type { Sheet } from './storage'

/** 저녁 6시부터 남은 일 한 줄을 보여준다 (D-034) */
export const EVENING_HOUR = 18

export function count(sheet: Sheet) {
  const todos = SLOTS.flatMap((s) => sheet.slots[s.id])
  const open = todos.filter((t) => !t.done)
  const unsent = open.filter((t) => !t.sent).length
  return { todos, open, unsent, sent: open.length - unsent }
}

/** [내일로 보내기]가 보이는지 — 보이면 이 화면의 주요 행동은 보내기다 */
export function sendLineVisible(sheet: Sheet, hour: number): boolean {
  const { unsent } = count(sheet)
  return unsent > 0 && hour >= EVENING_HOUR
}
