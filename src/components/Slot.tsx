import type { SlotId } from '../lib/slots'
import type { Todo } from '../lib/storage'
import { TodoInput } from './TodoInput'

type Props = {
  id: SlotId
  label: string
  todos: Todo[]
  editing: boolean
  onStartEditing: () => void
  onStopEditing: () => void
  onAdd: (text: string) => void
}

export function Slot({ id, label, todos, editing, onStartEditing, onStopEditing, onAdd }: Props) {
  // 비어 있는 노트 선 — 아무것도 없으면 두 줄, 적어 둔 게 있으면 한 줄
  const blankLines = editing ? Math.max(0, 1 - todos.length) : Math.max(1, 2 - todos.length)

  return (
    <section aria-labelledby={`slot-${id}`} className="border-t border-hairline py-4">
      <h2 id={`slot-${id}`} className="text-[20px] leading-8 text-muted" onClick={onStartEditing}>
        {label}
      </h2>
      <ul className="mt-1">
        {todos.map((t) => (
          <li key={t.id} className="border-b border-dashed border-warm-sand py-1 text-[20px] leading-8 break-words">
            {t.text}
          </li>
        ))}
      </ul>
      {editing && <TodoInput slotLabel={label} onSubmit={onAdd} onClose={onStopEditing} />}
      {Array.from({ length: blankLines }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`${label} 칸에 할 일 적기`}
          tabIndex={i === 0 ? 0 : -1}
          onClick={onStartEditing}
          className="block h-10 w-full cursor-text border-b border-dashed border-warm-sand outline-none focus-visible:bg-canvas"
        />
      ))}
    </section>
  )
}
