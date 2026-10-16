import { useState } from 'react'
import { TodaySheet } from './components/TodaySheet'
import { now } from './lib/clock'

export default function App() {
  // 앱을 연 날의 장 — 자정이 지나도 그대로 둔다 (F1 예외 '전체')
  const [today] = useState(now)
  return (
    <main className="mx-auto w-full max-w-[430px] px-3 pt-4 pb-28 sm:pt-12">
      <TodaySheet today={today} />
    </main>
  )
}
