const WEEKDAYS = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

/** 장 하나를 가리키는 날짜 열쇠 (예: 2026-10-16) */
export function dateKey(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

/** 장 맨 위 제목 (예: 10월 16일 금요일) */
export function sheetTitle(d: Date): string {
  return `${d.getMonth() + 1}월 ${d.getDate()}일 ${WEEKDAYS[d.getDay()]}`
}

/** 1년 중 몇째 날인지 — 오늘의 한 줄을 고를 때 쓴다 */
export function dayOfYear(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 0)
  return Math.floor((d.getTime() - start.getTime()) / 86_400_000)
}

/** 날짜 열쇠 하루 앞 (예: 2026-10-17 → 2026-10-16) */
export function dayBefore(key: string): string {
  const [y, m, d] = key.split('-').map(Number)
  return dateKey(new Date(y, m - 1, d - 1))
}

/** 날짜 열쇠를 그날 정오의 Date로 (지난 장의 제목·오늘의 한 줄에 쓴다) */
export function fromKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d, 12)
}
