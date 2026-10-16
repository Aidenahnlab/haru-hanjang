export type ToastMessage = { id: number; text: string; action?: { label: string; onClick: () => void } }

export function Toast({ toast }: { toast: ToastMessage | null }) {
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-0 z-10 px-3 pb-[max(16px,env(safe-area-inset-bottom))]">
      {toast && (
        <div
          key={toast.id}
          className="pointer-events-auto mx-auto flex max-w-[406px] items-center gap-3 rounded-lg bg-surface-dark px-4 py-3 text-[15px] leading-6 text-canvas"
        >
          <p className="flex-1">{toast.text}</p>
          {toast.action && (
            <button
              type="button"
              onClick={toast.action.onClick}
              className="shrink-0 rounded-md px-2 py-1 font-medium text-surface underline underline-offset-4 active:bg-white/10"
            >
              {toast.action.label}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
