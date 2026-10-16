import { Pencil, Trash2 } from 'lucide-react'
import { useEffect, useRef } from 'react'

type Props = { onEdit: () => void; onDelete: () => void; onClose: () => void }

/** 길게 누르면 뜨는 작은 메뉴 — [고치기] [지우기]만 */
export function TodoMenu({ onEdit, onDelete, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.querySelector('button')?.focus()
    const outside = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClose()
    }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    // 메뉴를 연 손가락이 떼어질 때 바로 닫히지 않게 한 박자 늦춘다
    const id = window.setTimeout(() => document.addEventListener('pointerdown', outside), 0)
    document.addEventListener('keydown', esc)
    return () => {
      window.clearTimeout(id)
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', esc)
    }
  }, [onClose])

  const item =
    'flex items-center gap-2 rounded-md px-3 py-2 text-[15px] leading-6 text-foreground outline-none active:bg-canvas focus-visible:bg-canvas'

  return (
    <div
      ref={ref}
      role="menu"
      className="absolute top-full left-0 z-20 mt-1 flex gap-1 rounded-lg border border-warm-sand bg-surface p-1"
    >
      <button type="button" role="menuitem" onClick={onEdit} className={item}>
        <Pencil size={16} strokeWidth={2} aria-hidden />
        고치기
      </button>
      <button type="button" role="menuitem" onClick={onDelete} className={item}>
        <Trash2 size={16} strokeWidth={2} aria-hidden />
        지우기
      </button>
    </div>
  )
}
