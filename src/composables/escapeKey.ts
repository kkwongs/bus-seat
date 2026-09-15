import { watch, type MaybeRefOrGetter } from 'vue'

/**
 * Toggles a window keydown listener as the reactive open state changes and calls the callback for
 * Escape key presses while the listener is active.
 */
export function useEscapeKey(isOpened: MaybeRefOrGetter, onEscape: () => void) {
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onEscape()
    }
  }

  watch(isOpened, (value) => {
    if (value) {
      window.addEventListener('keydown', handleKeydown)
    } else {
      window.removeEventListener('keydown', handleKeydown)
    }
  })
}
