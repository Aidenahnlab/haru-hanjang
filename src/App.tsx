import { useEffect, useState } from 'react'
import { TodaySheet } from './components/TodaySheet'
import { now } from './lib/clock'
import { dateKey } from './lib/date'

export default function App() {
  // 보고 있는 동안은 자정이 지나도 그 장을 그대로 두고 (F1 예외 '전체'),
  // 다른 앱이나 탭에 갔다가 돌아왔을 때 날짜가 바뀌었으면 새 장을 펼친다 (D-029)
  const [today, setToday] = useState(now)

  useEffect(() => {
    const comeBack = () => {
      if (document.visibilityState !== 'visible') return
      const current = now()
      setToday((shown) => (dateKey(current) === dateKey(shown) ? shown : current))
    }
    document.addEventListener('visibilitychange', comeBack)
    window.addEventListener('pageshow', comeBack)
    return () => {
      document.removeEventListener('visibilitychange', comeBack)
      window.removeEventListener('pageshow', comeBack)
    }
  }, [])

  return (
    <main className="mx-auto w-full max-w-[430px] px-3 pt-4 pb-28 sm:pt-12">
      <TodaySheet key={dateKey(today)} today={today} />
    </main>
  )
}
