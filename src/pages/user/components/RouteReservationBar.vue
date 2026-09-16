<template>
  <Teleport to="#user-layout">
    <nav
      class="sticky inset-x-0 bottom-0 z-100 flex justify-center bg-linear-to-t from-slate-50 via-white via-90% to-white/10 p-4 shadow-2xs"
    >
      <div class="max-w-md flex-1 space-y-3 text-sm">
        <div>
          <p class="px-2 py-1 font-medium text-sky-500">{{ travelTime }}</p>
          <div
            class="grid grid-cols-[repeat(3,auto)] items-center justify-around rounded-2xl border-2 border-slate-200 py-2"
          >
            <div class="space-y-0.5 px-2 text-center">
              <p>{{ routeStore.selectedStartStop.stopName }}</p>
              <p class="text-slate-500">
                {{ routeStore.selectedStartStop.arrivalTime[departureTime] }}
              </p>
            </div>

            <div class="inline-flex size-8 rounded-full bg-slate-200 p-2">
              <ArrowRight class="text-slate-600" :size="16" />
            </div>

            <div class="space-y-0.5 px-2 text-center">
              <p>{{ routeStore.selectedEndStop.stopName }}</p>
              <p class="text-slate-500">
                {{ routeStore.selectedEndStop.arrivalTime[departureTime] }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex gap-x-2">
          <button
            class="inline-flex size-10 items-center justify-center rounded-lg border-2 border-slate-200"
          >
            <Star class="text-slate-400" :size="18" />
          </button>
          <button class="flex-1 rounded-lg bg-sky-600 font-medium text-white" @click="open">
            예약하기
          </button>
        </div>
      </div>
    </nav>
  </Teleport>
</template>

<script setup lang="ts">
import { useRouteStore } from '@/stores/route'

import Star from '@primeicons/vue/star'
import ArrowRight from '@primeicons/vue/arrow-right'

interface Props {
  travelTime?: string
  departureTime: string
}
defineProps<Props>()

const emit = defineEmits<{
  openReservation: []
}>()

const routeStore = useRouteStore()

const open = () => {
  emit('openReservation')
}
</script>

<style scoped></style>
