import { useCallback, useState } from 'react'
import type { SlotId } from './slots'
import { loadSheet, newId, saveSheet, type Sheet } from './storage'

export function useSheet(date: string, onSaveError: () => void) {
  const [sheet, setSheet] = useState<Sheet>(() => loadSheet(date))

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

  return { sheet, addTodo }
}
