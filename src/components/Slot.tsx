import { useCallback, useState } from 'react'
import type { SlotId } from '../lib/slots'
import type { Todo } from '../lib/storage'
import { TodoInput } from './TodoInput'
import { TodoItem } from './TodoItem'

type Props = {
  id: SlotId
  label: string
  todos: Todo[]
  editing: boolean
  onStartEditing: () => void
  onStopEditing: () => void
  onAdd: (text: string) => void
  onDraft: (text: string) => void
  onToggle: (todo: Todo) => void
  onEdit: (todo: Todo, text: string) => void
  onDelete: (todo: Todo, index: number) => void
}

export function Slot({ id, label, todos, editing, onStartEditing, onStopEditing, onAdd, onDraft, onToggle, onEdit, onDelete }: Props) {
  const [menuFor, setMenuFor] = useState<string | null>(null)
  const [fixing, setFixing] = useState<string | null>(null)
  const closeMenu = useCallback(() => setMenuFor(null), [])

  // 비어 있는 노트 선 — 아무것도 없으면 두 줄, 적어 둔 게 있으면 한 줄
  const blankLines = editing ? Math.max(0, 1 - todos.length) : Math.max(1, 2 - todos.length)

  return (
    <section aria-labelledby={`slot-${id}`} className="border-t border-hairline py-4">
      <h2 id={`slot-${id}`} className="text-[20px] leading-8 text-muted" onClick={onStartEditing}>
        {label}
      </h2>
      <ul className="mt-1">
        {todos.map((t, i) =>
          fixing === t.id ? (
            <li key={t.id}>
              <TodoInput
                slotLabel={label}
                initialText={t.text}
                onSubmit={(text) => text !== t.text && onEdit(t, text)}
                onClose={() => setFixing(null)}
              />
            </li>
          ) : (
            <TodoItem
              key={t.id}
              todo={t}
              menuOpen={menuFor === t.id}
              onToggle={() => onToggle(t)}
              onOpenMenu={() => setMenuFor(t.id)}
              onCloseMenu={closeMenu}
              onEdit={() => {
                setMenuFor(null)
                setFixing(t.id)
              }}
              onDelete={() => {
                setMenuFor(null)
                onDelete(t, i)
              }}
            />
          ),
        )}
      </ul>
      {editing && <TodoInput slotLabel={label} onSubmit={onAdd} onDraft={onDraft} onClose={onStopEditing} />}
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
