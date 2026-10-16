import { SLOTS, type SlotId } from './slots'

export type Todo = {
  id: string
  text: string
  done: boolean
  /** 밤에 내일로 보낸 일 (F3) */
  sent?: boolean
}
export type Sheet = {
  date: string
  slots: Record<SlotId, Todo[]>
  /** 이 장을 펼치기 바로 전에 펼친 장의 날짜. 없으면 이 기기의 첫 장 (F1) */
  prevDate?: string
  /** 지난 장에서 넘겨받은 일의 개수 — 아침 인사에 쓴다 */
  received?: number
}

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
    return { ...saved, date, slots: { ...emptySheet(date).slots, ...saved.slots } }
  } catch {
    return emptySheet(date)
  }
}

function hasSheet(date: string): boolean {
  try {
    return localStorage.getItem(`${PREFIX}sheet:${date}`) !== null
  } catch {
    return false
  }
}

/** 이 날짜보다 앞서 펼친 장 중 가장 최근 날짜 */
function previousSheetDate(date: string): string | undefined {
  try {
    const dates = Object.keys(localStorage)
      .filter((k) => k.startsWith(`${PREFIX}sheet:`))
      .map((k) => k.slice(`${PREFIX}sheet:`.length))
      .filter((d) => d < date)
      .sort()
    return dates.at(-1)
  } catch {
    return undefined
  }
}

/** 그 날의 장을 연다. 처음 여는 날이면 새 장을 펼쳐 저장해 둔다 (F2 ①) */
export function openSheet(date: string): Sheet {
  if (hasSheet(date)) return loadSheet(date)
  const prevDate = previousSheetDate(date)
  const sheet: Sheet = { ...emptySheet(date), prevDate }
  if (prevDate) {
    // 넘긴 일은 달력상 내일이 아니라 다음에 펼치는 장으로 온다 — 같은 칸 맨 위에 (D-028)
    const prev = loadSheet(prevDate)
    let received = 0
    for (const { id: slot } of SLOTS) {
      const carried = prev.slots[slot]
        .filter((t) => !t.done && (t.sent || mockSent))
        .map((t) => ({ id: newId(), text: t.text, done: false }))
      sheet.slots[slot] = carried
      received += carried.length
    }
    sheet.received = received
  }
  saveSheet(sheet)
  return sheet
}

// 흉내: 밤에 내일로 보내기 — F3를 만들기 전까지 주소에 &sent=1을 붙이면 지난 장의 남은 일을 보낸 것으로 친다 (SETUP)
const mockSent = new URLSearchParams(location.search).get('sent') === '1'

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
