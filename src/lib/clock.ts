// 흉내: 날짜·시각 — 주소 끝에 ?now=2026-10-17T08:00을 붙이면 그 시각부터 시계가 흐른다 (SETUP)
const param = new URLSearchParams(location.search).get('now')
const parsed = param ? new Date(param) : null
const offset = parsed && !Number.isNaN(parsed.getTime()) ? parsed.getTime() - Date.now() : 0

/** 지금 시각. 흉내를 쓰지 않으면 기기 시계 그대로 */
export function now(): Date {
  return new Date(Date.now() + offset)
}
