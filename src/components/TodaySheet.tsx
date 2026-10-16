import { useCallback, useState } from 'react'
import { dateKey } from '../lib/date'
import { SLOTS, type SlotId } from '../lib/slots'
import { useSheet } from '../lib/useSheet'
import { useToast } from '../lib/useToast'
import { SheetHeader } from './SheetHeader'
import { Slot } from './Slot'
import { Toast } from './Toast'

export function TodaySheet({ today }: { today: Date }) {
  const { toast, show } = useToast()
  const onSaveError = useCallback(
    () => show('방금 적은 할 일을 저장하지 못했어요. 잠시 후 다시 적어 주세요.', undefined, 6000),
    [show],
  )
  const { sheet, addTodo } = useSheet(dateKey(today), onSaveError)
  const [editing, setEditing] = useState<SlotId | null>(null)

  return (
    <>
      <article className="rounded-media border border-hairline bg-surface px-6 pt-10 pb-6 sm:p-12">
        <SheetHeader today={today} />
        {SLOTS.map((s) => (
          <Slot
            key={s.id}
            id={s.id}
            label={s.label}
            todos={sheet.slots[s.id]}
            editing={editing === s.id}
            onStartEditing={() => setEditing(s.id)}
            onStopEditing={() => setEditing((cur) => (cur === s.id ? null : cur))}
            onAdd={(text) => addTodo(s.id, text)}
          />
        ))}
      </article>
      <Toast toast={toast} />
    </>
  )
}
