import { watch, type MaybeRefOrGetter } from 'vue'

export function useBodyScrollLock(isLocked: MaybeRefOrGetter) {
  watch(isLocked, (value) => {
    document.body.style.overflow = value ? 'hidden' : ''
  })
}
