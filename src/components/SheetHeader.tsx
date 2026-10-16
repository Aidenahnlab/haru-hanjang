import { dayBefore, sheetTitle } from '../lib/date'
import { quoteOfDay } from '../lib/quotes'
import { ChevronLeft } from 'lucide-react'
import { previousSheetDate, type Sheet } from '../lib/storage'

/** 안내 줄 — 이 기기의 첫 장이면 F1 안내, 그다음 장부터는 아침 인사 (F2 ①) */
function greeting(sheet: Sheet): { text: string[]; quiet: boolean } {
  if (!sheet.prevDate) return { text: ['오늘 장을 펼쳐 두었어요.', '칸을 톡 눌러 적어 보세요.'], quiet: true }
  const n = sheet.received ?? 0
  if (n === 0) return { text: ['새 장이 펼쳐졌어요 ☀️', '오늘의 한 줄도 바뀌었어요.'], quiet: false }
  const from = sheet.prevDate === dayBefore(sheet.date) ? '어제' : '지난 장에서'
  return { text: ['오늘 장이 준비됐어요 ☀️', `${from} 넘긴 일 ${n}개가 기다리고 있어요!`], quiet: false }
}

type Props = {
  today: Date
  sheet: Sheet
  onMoveLeftovers: () => void
  /** 저녁에 [내일로 보내기]가 함께 보이면 옮기기는 조용한 버튼으로 — 강조색은 화면당 하나 (D-011) */
  quietMove?: boolean
  onOpenPast: (date: string) => void
}

export function SheetHeader({ today, sheet, onMoveLeftovers, quietMove, onOpenPast }: Props) {
  const quote = quoteOfDay(today)
  const pastDate = previousSheetDate(sheet.date)
  const greet = greeting(sheet)
  const leftoverCount = sheet.leftovers?.length ?? 0
  const leftoverFrom = sheet.prevDate === dayBefore(sheet.date) ? '어제 장' : '지난 장'
  return (
    <header className="pb-6">
      {pastDate && (
        <button
          type="button"
          onClick={() => onOpenPast(pastDate)}
          className="-ml-1 mb-2 flex items-center gap-1 rounded-md px-1 py-1 text-[15px] leading-6 text-muted active:bg-canvas"
        >
          <ChevronLeft size={16} strokeWidth={2} aria-hidden />
          지난 장 넘겨 보기
        </button>
      )}
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
      {sheet.leftoverState === 'offered' && leftoverCount > 0 && (
        <div className="mt-3">
          <p className="text-[15px] leading-6 text-muted">
            {leftoverFrom}에 남은 일 {leftoverCount}개가 있어요.
          </p>
          <button
            type="button"
            onClick={onMoveLeftovers}
            className={`mt-2 rounded-lg px-4 py-2 text-[15px] leading-6 font-medium active:opacity-80 ${
              quietMove ? 'border border-warm-sand bg-surface text-foreground' : 'bg-primary text-surface'
            }`}
          >
            오늘 장에 옮기기
          </button>
        </div>
      )}
    </header>
  )
}
