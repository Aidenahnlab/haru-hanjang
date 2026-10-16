import { useCallback, useRef, useState } from 'react'
import { SLOTS, type SlotId } from './slots'
import { applyPendingDraft, newId, openSheet, saveSheet, type Sheet, type Todo } from './storage'

export function useSheet(date: string, onSaveError: () => void) {
  const [sheet, setSheet] = useState<Sheet>(() => {
    applyPendingDraft()
    return openSheet(date)
  })
  const current = useRef(sheet)

  // 화면은 언제나 바꾸고, 저장에 실패하면 알리기만 한다 (적은 글은 화면에 남긴다)
  const update = useCallback(
    (change: (s: Sheet) => Sheet, onError: () => void = onSaveError) => {
      const next = change(current.current)
      current.current = next
      setSheet(next)
      if (!saveSheet(next)) onError()
      return next
    },
    [onSaveError],
  )

  /** 오늘 장에 무엇이든 적거나 그으면 남은 일 한 줄은 조용히 접힌다 (F2 ①) */
  const fold = (s: Sheet): Sheet => (s.leftoverState === 'offered' ? { ...s, leftoverState: 'folded' } : s)

  const addTodo = useCallback(
    (slot: SlotId, text: string) =>
      update((s) => ({
        ...fold(s),
        slots: { ...s.slots, [slot]: [...s.slots[slot], { id: newId(), text, done: false }] },
      })),
    [update],
  )

  const setDone = useCallback(
    (slot: SlotId, id: string, done: boolean) =>
      update((s) => ({
        ...fold(s),
        // 보낸 일을 자정 전에 그으면 내일로 가지 않는다 (F3 예외)
        slots: {
          ...s.slots,
          [slot]: s.slots[slot].map((t) => (t.id === id ? { ...t, done, sent: done ? false : t.sent } : t)),
        },
      })),
    [update],
  )

  const editTodo = useCallback(
    (slot: SlotId, id: string, text: string) =>
      update((s) => ({
        ...fold(s),
        slots: { ...s.slots, [slot]: s.slots[slot].map((t) => (t.id === id ? { ...t, text } : t)) },
      })),
    [update],
  )

  const removeTodo = useCallback(
    (slot: SlotId, id: string) =>
      update((s) => ({ ...fold(s), slots: { ...s.slots, [slot]: s.slots[slot].filter((t) => t.id !== id) } })),
    [update],
  )

  /** 지운 할 일을 원래 자리에 되돌린다 */
  const restoreTodo = useCallback(
    (slot: SlotId, todo: Todo, index: number) =>
      update((s) => {
        const list = s.slots[slot].filter((t) => t.id !== todo.id)
        list.splice(Math.min(index, list.length), 0, todo)
        return { ...s, slots: { ...s.slots, [slot]: list } }
      }),
    [update],
  )

  /** 지난 장에 남은 일을 오늘 장의 같은 칸 맨 위로 옮긴다. 저장에 실패하면 false */
  const moveLeftovers = useCallback(
    (onError: () => void) => {
      let ok = true
      update(
        (s) => {
          const slots = { ...s.slots }
          const movedIds: string[] = []
          for (const { id: slot } of SLOTS) {
            const moved = (s.leftovers ?? [])
              .filter((l) => l.slot === slot)
              .map((l) => ({ id: newId(), text: l.text, done: false }))
            movedIds.push(...moved.map((t) => t.id))
            slots[slot] = [...moved, ...s.slots[slot]]
          }
          return { ...s, slots, movedIds, leftoverState: 'moved' }
        },
        () => {
          ok = false
          onError()
        },
      )
      return ok
    },
    [update],
  )

  /** 옮기기 되돌리기 — 오늘 장에서 빼고 남은 일 한 줄을 다시 보여준다 */
  const undoMoveLeftovers = useCallback(
    () =>
      update((s) => {
        const ids = new Set(s.movedIds ?? [])
        const slots = { ...s.slots }
        for (const { id: slot } of SLOTS) slots[slot] = s.slots[slot].filter((t) => !ids.has(t.id))
        return { ...s, slots, movedIds: [], leftoverState: 'offered' }
      }),
    [update],
  )

  /** 그지 않은 일을 모두 내일로 보낸다 (F3). 보낸 할 일 id와 저장 성공 여부를 돌려준다 */
  const sendLeftovers = useCallback(
    (onError: () => void) => {
      let ok = true
      const ids: string[] = []
      update(
        (s) => {
          const slots = { ...s.slots }
          for (const { id: slot } of SLOTS)
            slots[slot] = s.slots[slot].map((t) => {
              if (t.done || t.sent) return t
              ids.push(t.id)
              return { ...t, sent: true }
            })
          return { ...fold(s), slots }
        },
        () => {
          ok = false
          onError()
        },
      )
      return { ok, ids }
    },
    [update],
  )

  /** 보내기 되돌리기 — 방금 보낸 할 일의 보낸 표시를 푼다 */
  const undoSend = useCallback(
    (ids: string[]) =>
      update((s) => {
        const undo = new Set(ids)
        const slots = { ...s.slots }
        for (const { id: slot } of SLOTS)
          slots[slot] = s.slots[slot].map((t) => (undo.has(t.id) ? { ...t, sent: false } : t))
        return { ...s, slots }
      }),
    [update],
  )

  return {
    sheet,
    addTodo,
    setDone,
    editTodo,
    removeTodo,
    restoreTodo,
    moveLeftovers,
    undoMoveLeftovers,
    sendLeftovers,
    undoSend,
  }
}
