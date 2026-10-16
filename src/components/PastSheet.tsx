import { fromKey, sheetTitle } from '../lib/date'
import { quoteOfDay } from '../lib/quotes'
import { SLOTS } from '../lib/slots'
import { loadSheet } from '../lib/storage'

type Props = { date: string; onToday: () => void }

/** 지난 장 — 읽기만 하는 기록 (F4 ②, D-041) */
export function PastSheet({ date, onToday }: Props) {
  const sheet = loadSheet(date)
  const day = fromKey(date)
  const quote = quoteOfDay(day)

  return (
    <>
      <nav className="mb-3 flex items-center justify-center px-2 text-[15px] leading-6">
        <button type="button" onClick={onToday} className="rounded-md px-2 py-1 text-foreground active:bg-warm-sand">
          오늘 장으로
        </button>
      </nav>
      <article
        aria-label={`${sheetTitle(day)} 지난 장`}
        className="rounded-card border border-hairline bg-surface px-6 pt-8 pb-6 sm:p-8"
      >
        <header className="pb-6">
          <h1 className="font-serif text-[36px] leading-[46.8px] font-medium tracking-[-0.01em]">{sheetTitle(day)}</h1>
          <figure className="mt-5">
            <blockquote className="font-serif text-[20px] leading-[32px] font-medium">“{quote.text}”</blockquote>
            <figcaption className="mt-1 text-right text-[15px] leading-6 text-muted">— {quote.author}</figcaption>
          </figure>
        </header>
        {SLOTS.map((s) => (
          <section key={s.id} className="border-t border-hairline py-4">
            <h2 className="text-[20px] leading-8 text-muted">{s.label}</h2>
            <ul className="mt-1">
              {sheet.slots[s.id].map((t) => (
                <li key={t.id} className="border-b border-dashed border-warm-sand py-1 text-[20px] leading-8">
                  <span className={`pen-line ${t.done ? 'is-struck text-muted/70' : ''} ${t.sent && !t.done ? 'text-muted/70' : ''}`}>
                    {t.text}
                  </span>
                  {t.sent && !t.done && <span className="ml-2 text-[15px] leading-6 text-muted">내일로</span>}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </article>
    </>
  )
}
