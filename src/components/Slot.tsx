import type { SlotId } from '../lib/slots'

type Props = { id: SlotId; label: string }

export function Slot({ id, label }: Props) {
  return (
    <section aria-labelledby={`slot-${id}`} className="border-t border-hairline py-4">
      <h2 id={`slot-${id}`} className="text-[20px] leading-8 text-muted">
        {label}
      </h2>
      {/* 빈 줄 노트 선 */}
      <div aria-hidden className="mt-1">
        <div className="h-10 border-b border-dashed border-warm-sand" />
        <div className="h-10 border-b border-dashed border-warm-sand" />
      </div>
    </section>
  )
}
