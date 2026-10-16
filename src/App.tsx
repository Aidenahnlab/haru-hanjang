import { useState } from 'react'
import { TodaySheet } from './components/TodaySheet'

export default function App() {
  // 앱을 연 날의 장 — 자정이 지나도 그대로 둔다 (F1 예외 '전체')
  const [today] = useState(() => new Date())
  return (
    <main className="mx-auto w-full max-w-[430px] px-3 py-4 sm:py-12">
      <TodaySheet today={today} />
    </main>
  )
}
