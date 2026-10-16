import type { Todo } from '../lib/storage'
import { useLongPress } from '../lib/useLongPress'
import { TodoMenu } from './TodoMenu'

type Props = {
  todo: Todo
  menuOpen: boolean
  onToggle: () => void
  onOpenMenu: () => void
  onCloseMenu: () => void
  onEdit: () => void
  onDelete: () => void
}

/** 적어 둔 할 일. 톡 누르면 펜 선이 그어지고(다시 누르면 풀림), 길게 누르면 고치기·지우기 */
export function TodoItem({ todo, menuOpen, onToggle, onOpenMenu, onCloseMenu, onEdit, onDelete }: Props) {
  const press = useLongPress(onOpenMenu, onToggle)

  return (
    <li className="relative border-b border-dashed border-warm-sand">
      <button
        type="button"
        aria-pressed={todo.done}
        aria-haspopup="menu"
        {...press}
        className="block w-full py-1 text-left text-[20px] leading-8 outline-none select-none [-webkit-touch-callout:none] focus-visible:bg-canvas"
      >
        <span className={`pen-line ${todo.done ? 'is-struck text-muted/70' : ''} ${todo.sent && !todo.done ? 'text-muted/70' : ''}`}>
          {todo.text}
        </span>
        {todo.sent && !todo.done && <span className="ml-2 text-[15px] leading-6 text-muted">내일로</span>}
      </button>
      {menuOpen && <TodoMenu onEdit={onEdit} onDelete={onDelete} onClose={onCloseMenu} />}
    </li>
  )
}
