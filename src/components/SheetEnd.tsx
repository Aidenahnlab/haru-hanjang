import { SLOTS } from '../lib/slots'
import type { Sheet } from '../lib/storage'

/** 저녁 6시부터 남은 일 한 줄을 보여준다 (D-034) */
export const EVENING_HOUR = 18

type Props = { sheet: Sheet; hour: number; onSend: () => void }

/** 장 맨 끝 한 줄 — 남은 일 보내기, 보낸 뒤 한마디 (F3) */
export function SheetEnd({ sheet, hour, onSend }: Props) {
  const todos = SLOTS.flatMap((s) => sheet.slots[s.id])
  const open = todos.filter((t) => !t.done)
  const unsent = open.filter((t) => !t.sent).length
  const sent = open.length - unsent

  let body: React.ReactNode = null
  if (todos.length > 0 && open.length === 0) {
    // 다 그은 장 — 시간과 상관없이 (D-036)
    body = (
      <p className="text-foreground">
        오늘 장, 다 그었어요 ✨<br />
        가지런히 남겨 둘게요.
      </p>
    )
  } else if (unsent > 0 && hour >= EVENING_HOUR) {
    body = (
      <>
        <p>남은 일 {unsent}개가 있어요.</p>
        <button
          type="button"
          onClick={onSend}
          className="mt-2 rounded-lg bg-primary px-4 py-2 text-[15px] leading-6 font-medium text-surface active:opacity-80"
        >
          내일로 보내기
        </button>
      </>
    )
  } else if (sent > 0 && unsent === 0) {
    body = <p>남은 일 {sent}개는 내일 같은 칸에 옮겨 둘게요.</p>
  }

  if (!body) return null
  return <footer className="border-t border-hairline pt-4 text-[15px] leading-6 text-muted">{body}</footer>
}
