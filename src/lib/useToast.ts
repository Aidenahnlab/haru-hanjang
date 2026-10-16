import { useCallback, useEffect, useRef, useState } from 'react'
import type { ToastMessage } from '../components/Toast'

export function useToast() {
  const [toast, setToast] = useState<ToastMessage | null>(null)
  const timer = useRef<number | undefined>(undefined)
  const seq = useRef(0)

  const hide = useCallback(() => {
    window.clearTimeout(timer.current)
    setToast(null)
  }, [])

  const show = useCallback((text: string, action?: ToastMessage['action'], ms = 5000) => {
    window.clearTimeout(timer.current)
    setToast({ id: ++seq.current, text, action })
    timer.current = window.setTimeout(() => setToast(null), ms)
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return { toast, show, hide }
}
