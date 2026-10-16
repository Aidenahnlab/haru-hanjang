import { sheetTitle } from '../lib/date'
import { quoteOfDay } from '../lib/quotes'

export function SheetHeader({ today }: { today: Date }) {
  const quote = quoteOfDay(today)
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
      <p className="mt-6 text-[15px] leading-6 text-muted">
        오늘 장을 펼쳐 두었어요.
        <br />
        칸을 톡 눌러 적어 보세요.
      </p>
    </header>
  )
}
