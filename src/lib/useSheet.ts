import { useCallback, useState } from 'react'
import type { SlotId } from './slots'
import { applyPendingDraft, loadSheet, newId, saveSheet, type Sheet, type Todo } from './storage'

export function useSheet(date: string, onSaveError: () => void) {
  const [sheet, setSheet] = useState<Sheet>(() => {
    applyPendingDraft()
    return loadSheet(date)
  })

  // 화면은 언제나 바꾸고, 저장에 실패하면 알리기만 한다 (적은 글은 화면에 남긴다)
  const update = useCallback(
    (change: (s: Sheet) => Sheet) => {
      setSheet((prev) => {
        const next = change(prev)
        if (!saveSheet(next)) queueMicrotask(onSaveError)
        return next
      })
    },
    [onSaveError],
  )

  const addTodo = useCallback(
    (slot: SlotId, text: string) =>
      update((s) => ({
        ...s,
        slots: { ...s.slots, [slot]: [...s.slots[slot], { id: newId(), text, done: false }] },
      })),
    [update],
  )

  const setDone = useCallback(
    (slot: SlotId, id: string, done: boolean) =>
      update((s) => ({
        ...s,
        slots: { ...s.slots, [slot]: s.slots[slot].map((t) => (t.id === id ? { ...t, done } : t)) },
      })),
    [update],
  )

  const editTodo = useCallback(
    (slot: SlotId, id: string, text: string) =>
      update((s) => ({
        ...s,
        slots: { ...s.slots, [slot]: s.slots[slot].map((t) => (t.id === id ? { ...t, text } : t)) },
      })),
    [update],
  )

  const removeTodo = useCallback(
    (slot: SlotId, id: string) =>
      update((s) => ({ ...s, slots: { ...s.slots, [slot]: s.slots[slot].filter((t) => t.id !== id) } })),
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

  return { sheet, addTodo, setDone, editTodo, removeTodo, restoreTodo }
}
