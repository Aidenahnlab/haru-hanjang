import { SLOTS } from '../lib/slots'
import { SheetHeader } from './SheetHeader'
import { Slot } from './Slot'

export function TodaySheet({ today }: { today: Date }) {
  return (
    <article className="rounded-media border border-hairline bg-surface px-6 pt-10 pb-6 sm:p-12">
      <SheetHeader today={today} />
      {SLOTS.map((s) => (
        <Slot key={s.id} id={s.id} label={s.label} />
      ))}
    </article>
  )
}
