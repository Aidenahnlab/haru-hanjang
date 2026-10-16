export const SLOTS = [
  { id: 'dawn', label: '새벽' },
  { id: 'morning', label: '오전' },
  { id: 'afternoon', label: '오후' },
  { id: 'night', label: '밤' },
] as const

export type SlotId = (typeof SLOTS)[number]['id']
