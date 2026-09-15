import { watch, type MaybeRefOrGetter } from 'vue'

/**
 * Watches a reactive lock state and hides or clears document body overflow when it changes.
 */
export function useBodyScrollLock(isLocked: MaybeRefOrGetter) {
  watch(isLocked, (value) => {
    document.body.style.overflow = value ? 'hidden' : ''
  })
}
