<template>
  <BaseModal :open="isOpen" size="sm" @close="close">
    <div class="-mx-6">
      <button
        v-for="departureTime in routeStore.route?.departureTimes"
        :key="departureTime"
        class="flex w-full items-center justify-between p-4 transition-[background-color] hover:bg-sky-100"
        @click="selectTime(departureTime)"
      >
        <span class="font-medium">{{ departureTime }}</span>
        <Check v-if="departureTime === selectedDepartureTime" />
      </button>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { useRouteStore } from '@/stores/route'

import Check from '@primeicons/vue/check'
import BaseModal from '@/components/base/BaseModal.vue'

interface Props {
  selectedDepartureTime: string | undefined
  isOpen: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  changeTime: [departureTime: string]
  close: []
}>()

const routeStore = useRouteStore()

const close = () => {
  emit('close')
}

const selectTime = (departureTime: string) => {
  emit('changeTime', departureTime)
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: transform 300ms ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(50%);
}
</style>
