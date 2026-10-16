import { useCallback, useRef, useState } from 'react'
import { dateKey } from '../lib/date'
import { SLOTS, type SlotId } from '../lib/slots'
import { hasSeenFirstStrike, markFirstStrikeSeen, type Todo } from '../lib/storage'
import { useSheet } from '../lib/useSheet'
import { useToast } from '../lib/useToast'
import { SheetHeader } from './SheetHeader'
import { Slot } from './Slot'
import { Toast } from './Toast'

export function TodaySheet({ today }: { today: Date }) {
  const { toast, show, hide } = useToast()
  const onSaveError = useCallback(
    () => show('방금 적은 할 일을 저장하지 못했어요. 잠시 후 다시 적어 주세요.', undefined, 6000),
    [show],
  )
  const { sheet, addTodo, setDone, editTodo, removeTodo, restoreTodo } = useSheet(dateKey(today), onSaveError)
  const [editing, setEditing] = useState<SlotId | null>(null)
  const firstStrikeSeen = useRef(hasSeenFirstStrike())

  function toggle(slot: SlotId, todo: Todo) {
    const done = !todo.done
    setDone(slot, todo.id, done)
    // 처음 그었을 때만 기록이 남는다는 한마디와 되돌리기 (F1 ④)
    if (done && !firstStrikeSeen.current) {
      firstStrikeSeen.current = true
      markFirstStrikeSeen()
      show('그은 줄은 지우지 않고 남겨 둘게요.', {
        label: '되돌리기',
        onClick: () => {
          setDone(slot, todo.id, false)
          hide()
        },
      })
    }
  }

  function remove(slot: SlotId, todo: Todo, index: number) {
    // 묻지 않고 바로 지우고, 되돌리기만 열어 둔다 (D-020)
    removeTodo(slot, todo.id)
    show('할 일을 지웠어요.', {
      label: '되돌리기',
      onClick: () => {
        restoreTodo(slot, todo, index)
        hide()
      },
    })
  }

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
            onToggle={(t) => toggle(s.id, t)}
            onEdit={(t, text) => editTodo(s.id, t.id, text)}
            onDelete={(t, i) => remove(s.id, t, i)}
          />
        ))}
      </article>
      <Toast toast={toast} />
    </>
  )
}
