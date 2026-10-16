import { useEffect, useState } from 'react'
import { PastSheet } from './components/PastSheet'
import { TodaySheet } from './components/TodaySheet'
import { now } from './lib/clock'
import { dateKey } from './lib/date'

export default function App() {
  // 보고 있는 동안은 자정이 지나도 그 장을 그대로 두고 (F1 예외 '전체'),
  // 다른 앱이나 탭에 갔다가 돌아왔을 때 날짜가 바뀌었으면 새 장을 펼친다 (D-029)
  const [today, setToday] = useState(now)
  /** 넘겨 보는 지난 장의 날짜. 없으면 오늘 장 (F4) */
  const [viewing, setViewing] = useState<string | null>(null)

  useEffect(() => {
    const comeBack = () => {
      if (document.visibilityState !== 'visible') return
      const current = now()
      setToday((shown) => {
        if (dateKey(current) === dateKey(shown)) return shown
        setViewing(null)
        return current
      })
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
      {viewing ? (
        <PastSheet date={viewing} onToday={() => setViewing(null)} />
      ) : (
        <TodaySheet key={dateKey(today)} today={today} onOpenPast={setViewing} />
      )}
    </main>
  )
}
