import { useRef } from 'react'

const HOLD_MS = 500
const MOVE_TOLERANCE = 8

/** 길게 누르기와 톡 누르기를 나눈다. 길게 누른 뒤의 클릭은 톡으로 치지 않는다 */
export function useLongPress(onLongPress: () => void, onTap: () => void) {
  const timer = useRef<number | undefined>(undefined)
  const start = useRef<{ x: number; y: number } | null>(null)
  const fired = useRef(false)

  const cancel = () => {
    window.clearTimeout(timer.current)
    start.current = null
  }

  return {
    onPointerDown: (e: React.PointerEvent) => {
      if (e.button !== 0) return
      fired.current = false
      start.current = { x: e.clientX, y: e.clientY }
      timer.current = window.setTimeout(() => {
        fired.current = true
        onLongPress()
      }, HOLD_MS)
    },
    onPointerMove: (e: React.PointerEvent) => {
      const s = start.current
      if (s && Math.hypot(e.clientX - s.x, e.clientY - s.y) > MOVE_TOLERANCE) cancel()
    },
    onPointerUp: cancel,
    onPointerCancel: cancel,
    onPointerLeave: cancel,
    // 데스크톱 오른쪽 클릭, 일부 휴대폰의 길게 누르기
    onContextMenu: (e: React.MouseEvent) => {
      e.preventDefault()
      cancel()
      fired.current = true
      onLongPress()
    },
    onClick: () => {
      if (fired.current) {
        fired.current = false
        return
      }
      onTap()
    },
  }
}
