import type { Todo } from '../lib/storage'

type Props = { todo: Todo; onToggle: () => void }

/** 적어 둔 할 일. 톡 누르면 펜 선이 왼쪽에서 오른쪽으로 그어지고, 다시 누르면 풀린다 */
export function TodoItem({ todo, onToggle }: Props) {
  return (
    <li className="border-b border-dashed border-warm-sand">
      <button
        type="button"
        aria-pressed={todo.done}
        onClick={onToggle}
        className="block w-full py-1 text-left text-[20px] leading-8 outline-none select-none focus-visible:bg-canvas"
      >
        <span className={`pen-line transition-colors duration-300 ${todo.done ? 'is-struck text-muted/70' : ''}`}>
          {todo.text}
        </span>
      </button>
    </li>
  )
}
