import { watch, type MaybeRefOrGetter } from 'vue'

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
