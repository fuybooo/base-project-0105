import { FRAMEWORK_KEY_LIST } from '@/models/keys/keys'

export function lrAll (): void {
  Object.keys(localStorage).filter(k => !FRAMEWORK_KEY_LIST.includes(k)).forEach(k => localStorage.removeItem(k))
}
