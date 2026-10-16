import { dayOfYear } from './date'

export type Quote = { text: string; author: string }

// 오늘의 한 줄 — 앱 안의 목록에서 날짜마다 하나 (SETUP: 서버 없음)
const QUOTES: Quote[] = [
  { text: '천 리 길도 한 걸음부터 시작된다.', author: '노자' },
  { text: '배우고 때때로 익히면 또한 기쁘지 아니한가.', author: '공자' },
  { text: '오늘 할 수 있는 일에 온 힘을 다하라.', author: '세네카' },
  { text: '작은 일에 충실한 사람이 큰일에도 충실하다.', author: '누가복음' },
  { text: '서두르지 말고, 그러나 쉬지도 말라.', author: '괴테' },
  { text: '물은 다투지 않고도 모든 것을 이롭게 한다.', author: '노자' },
  { text: '아는 것을 안다 하고, 모르는 것을 모른다 하는 것이 앎이다.', author: '공자' },
  { text: '우리가 반복하는 것이 곧 우리 자신이다.', author: '아리스토텔레스' },
  { text: '하루하루를 그것만으로 하나의 삶처럼 살아라.', author: '세네카' },
  { text: '단순함은 궁극의 정교함이다.', author: '레오나르도 다빈치' },
  { text: '시작이 반이다.', author: '아리스토텔레스' },
  { text: '고요한 물이 깊이 흐른다.', author: '옛말' },
  { text: '지금 이 순간에 마음을 두어라.', author: '마르쿠스 아우렐리우스' },
  { text: '가장 큰 영광은 넘어지지 않는 것이 아니라 넘어질 때마다 일어서는 것이다.', author: '공자' },
  { text: '적게 갖되 깊이 누려라.', author: '에피쿠로스' },
  { text: '내일은 오늘 우리가 한 일로 만들어진다.', author: '옛말' },
  { text: '느리게 가는 것을 두려워 말고, 멈추는 것을 두려워하라.', author: '중국 속담' },
  { text: '좋은 하루는 좋은 아침에서 시작된다.', author: '옛말' },
  { text: '마음이 고요하면 모든 것이 고요하다.', author: '장자' },
  { text: '할 일을 미루지 않는 것이 시간을 버는 일이다.', author: '세네카' },
  { text: '자연은 서두르지 않지만 모든 것을 이룬다.', author: '노자' },
  { text: '오늘이라는 날은 두 번 오지 않는다.', author: '단테' },
  { text: '한 가지 일을 할 때는 그 일만 하라.', author: '옛말' },
  { text: '행복은 스스로 만족하는 데 있다.', author: '아리스토텔레스' },
  { text: '많이 아는 것보다 바르게 아는 것이 낫다.', author: '헤라클레이토스' },
  { text: '마음먹은 대로 하루를 그려 보라.', author: '옛말' },
  { text: '부지런한 손이 풍성한 하루를 만든다.', author: '잠언' },
  { text: '인생은 우리가 하루 종일 생각하는 것으로 이루어진다.', author: '랄프 왈도 에머슨' },
  { text: '잘 쓴 하루는 편안한 잠을 가져온다.', author: '레오나르도 다빈치' },
  { text: '오늘 걷지 않으면 내일은 뛰어야 한다.', author: '옛말' },
]

export function quoteOfDay(d: Date): Quote {
  return QUOTES[dayOfYear(d) % QUOTES.length]
}
