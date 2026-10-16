import { useEffect, useLayoutEffect, useRef, useState } from 'react'

type Props = {
  slotLabel: string
  onSubmit: (text: string) => void
  onClose: () => void
  /** 고치기일 때 원래 글. 엔터를 치면 다음 줄을 열지 않고 닫는다 */
  initialText?: string
  /** 적던 글이 바뀔 때마다 — 엔터 없이 닫혀도 남기려고 */
  onDraft?: (text: string) => void
}

/** 노트 선 위에 글씨가 놓이는 입력줄. 엔터로 적고, 빈 줄 엔터나 바깥을 누르면 닫힌다 */
export function TodoInput({ slotLabel, onSubmit, onClose, initialText, onDraft }: Props) {
  const editing = initialText !== undefined
  const [text, setText] = useState(initialText ?? '')
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = ref.current
    el?.focus()
    el?.setSelectionRange(el.value.length, el.value.length)
  }, [])

  // 긴 할 일도 줄을 바꿔 다 보이게 높이를 맞춘다
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = '0px'
    el.style.height = `${el.scrollHeight}px`
  }, [text])

  function commit() {
    const value = text.trim()
    if (value) onSubmit(value)
    setText('')
    onDraft?.('')
    return value
  }

  return (
    <textarea
      ref={ref}
      rows={1}
      value={text}
      enterKeyHint="enter"
      aria-label={editing ? '할 일 고치기' : `${slotLabel} 칸에 할 일 적기`}
      placeholder={`${slotLabel}에 할 일을 적어 두세요.`}
      onChange={(e) => {
        const value = e.target.value.replace(/\n/g, '')
        setText(value)
        onDraft?.(value)
      }}
      onKeyDown={(e) => {
        if (e.key !== 'Enter' || e.nativeEvent.isComposing) return
        e.preventDefault()
        if (!commit() || editing) onClose()
      }}
      onBlur={() => {
        commit()
        onClose()
      }}
      className="block w-full resize-none overflow-hidden border-b border-dashed border-warm-sand bg-transparent py-1 text-[20px] leading-8 text-foreground outline-none placeholder:text-muted/60"
    />
  )
}
