import { onScopeDispose, ref, watch } from 'vue'
import type { Ref } from 'vue'

/**
 * Creates a ref that adopts the source's latest value after the source remains unchanged for the
 * requested delay. Any pending update is canceled when the current reactive scope is disposed.
 */
export const useDebounce = <Raw>(source: Ref<Raw>, delay = 300) => {
  const debounced = ref(source.value) as Ref<Raw>

  let timer: ReturnType<typeof setTimeout>

  const stop = watch(source, (value) => {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      debounced.value = value
    }, delay)
  })

  onScopeDispose(() => {
    clearTimeout(timer)
    stop()
  })

  return debounced
}
