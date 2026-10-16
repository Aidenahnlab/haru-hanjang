import { useEffect, useLayoutEffect, useRef, useState } from 'react'

type Props = {
  slotLabel: string
  onSubmit: (text: string) => void
  onClose: () => void
}

/** 노트 선 위에 글씨가 놓이는 입력줄. 엔터로 적고, 빈 줄 엔터나 바깥을 누르면 닫힌다 */
export function TodoInput({ slotLabel, onSubmit, onClose }: Props) {
  const [text, setText] = useState('')
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    ref.current?.focus()
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
    return value
  }

  return (
    <textarea
      ref={ref}
      rows={1}
      value={text}
      enterKeyHint="enter"
      aria-label={`${slotLabel} 칸에 할 일 적기`}
      placeholder={`${slotLabel}에 할 일을 적어 두세요.`}
      onChange={(e) => setText(e.target.value.replace(/\n/g, ''))}
      onKeyDown={(e) => {
        if (e.key !== 'Enter' || e.nativeEvent.isComposing) return
        e.preventDefault()
        if (!commit()) onClose()
      }}
      onBlur={() => {
        commit()
        onClose()
      }}
      className="block w-full resize-none overflow-hidden border-b border-dashed border-warm-sand bg-transparent py-1 text-[20px] leading-8 text-foreground outline-none placeholder:text-muted/60"
    />
  )
}
