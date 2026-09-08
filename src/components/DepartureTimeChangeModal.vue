<template>
  <div class="fixed top-0 right-0 bottom-0 left-0 z-1000 bg-gray-900/50">
    <div class="flex h-full w-full items-center justify-center">
      <div
        class="mx-5 min-h-10 w-full max-w-100 divide-y divide-slate-200 overflow-hidden rounded-xl bg-white"
      >
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouteStore } from '@/stores/route'

import Check from '@primeicons/vue/check'

defineProps<{ selectedDepartureTime: string | undefined }>()

const emit = defineEmits(['changeTime'])

const routeStore = useRouteStore()

const selectTime = (departureTime: string) => {
  emit('changeTime', departureTime)
}
</script>

<style scoped></style>
