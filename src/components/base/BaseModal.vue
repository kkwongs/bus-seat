<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="open" class="fixed inset-0 z-100 flex items-center justify-center">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50" @click="handleBackdrop" />

        <!-- Modal -->
        <div
          class="relative w-full overflow-hidden rounded-xl bg-white shadow-xl"
          :class="[sizeClass[size]]"
          role="dialog"
          aria-modal="true"
        >
          <!-- Header -->
          <div
            v-if="title || $slots.header"
            class="flex items-center justify-between px-6 py-4 pr-4"
          >
            <slot name="header">
              <h2 class="text-lg font-semibold">
                {{ title }}
              </h2>
            </slot>

            <button
              type="button"
              class="size-7 rounded-md text-sm text-gray-600 hover:bg-gray-100"
              aria-label="닫기"
              @click="close"
            >
              ✕
            </button>
          </div>

          <!-- Body -->
          <div class="px-6">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="flex justify-end gap-2 px-6 py-4">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useBodyScrollLock, useEscapeKey } from '@/composables'

interface Props {
  open: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnBackdrop?: boolean
  closeOnEsc?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  size: 'md',
  closeOnBackdrop: true,
  closeOnEsc: true,
})

const emit = defineEmits<{
  close: []
}>()

useBodyScrollLock(() => props.open)
if (props.closeOnEsc) {
  useEscapeKey(
    () => props.open,
    () => {
      close()
    },
  )
}

const sizeClass = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
}

const close = () => {
  emit('close')
}

const handleBackdrop = () => {
  if (props.closeOnBackdrop) {
    close()
  }
}
</script>

<style scoped></style>
