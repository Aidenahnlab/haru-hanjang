import { dayBefore, sheetTitle } from '../lib/date'
import { quoteOfDay } from '../lib/quotes'
import type { Sheet } from '../lib/storage'

/** 안내 줄 — 이 기기의 첫 장이면 F1 안내, 그다음 장부터는 아침 인사 (F2 ①) */
function greeting(sheet: Sheet): { text: string[]; quiet: boolean } {
  if (!sheet.prevDate) return { text: ['오늘 장을 펼쳐 두었어요.', '칸을 톡 눌러 적어 보세요.'], quiet: true }
  const n = sheet.received ?? 0
  if (n === 0) return { text: ['새 장이 펼쳐졌어요 ☀️', '오늘의 한 줄도 바뀌었어요.'], quiet: false }
  const from = sheet.prevDate === dayBefore(sheet.date) ? '어제' : '지난 장에서'
  return { text: ['오늘 장이 준비됐어요 ☀️', `${from} 넘긴 일 ${n}개가 기다리고 있어요!`], quiet: false }
}

export function SheetHeader({ today, sheet }: { today: Date; sheet: Sheet }) {
  const quote = quoteOfDay(today)
  const greet = greeting(sheet)
  return (
    <header className="pb-6">
      <h1 className="font-serif text-[36px] leading-[46.8px] font-medium tracking-[-0.01em]">
        {sheetTitle(today)}
      </h1>
      <figure className="mt-5">
        <blockquote className="font-serif text-[20px] leading-[32px] font-medium">
          “{quote.text}”
        </blockquote>
        <figcaption className="mt-1 text-right text-[15px] leading-6 text-muted">— {quote.author}</figcaption>
      </figure>
      <p className={`mt-6 text-[15px] leading-6 ${greet.quiet ? 'text-muted' : 'text-foreground'}`}>
        {greet.text[0]}
        <br />
        {greet.text[1]}
      </p>
    </header>
  )
}
