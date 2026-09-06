<template>
  <div ref="root" class="relative flex gap-x-0.5">
    <div class="z-10 inline-flex gap-x-3 pt-4 text-slate-500">
      <ChevronCircleDown :size="14" class="bg-white text-slate-400" /> <MapMarker :size="16" />
    </div>

    <div class="flex flex-1 items-center justify-between border-b border-slate-300 py-3">
      <div class="space-y-1">
        <p :class="{ 'text-slate-300': !stop.stopNumber }">{{ stop.stopName }}</p>
        <div class="flex gap-x-2 text-sm text-slate-600">
          <span :class="{ 'text-slate-300': !stop.stopNumber }">
            {{ stop.stopNumber || '미정차' }}
          </span>
          <template v-if="stop.stopNumber">
            <span class="text-xs text-slate-400">|</span>
            <span>&plusmn;08:09</span>
          </template>
        </div>
      </div>

      <button
        v-if="isStopLabelVisible"
        class="rounded-2xl border border-slate-300 px-3 py-1 text-sm text-slate-300"
        :class="{
          'border-slate-600 font-medium text-slate-600': isBoarding
            ? routeStore.selectedStartStop
            : routeStore.selectedEndStop,
        }"
        @click="selectStop"
      >
        {{ isBoarding ? '승차' : '하차' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { useRouteStore } from '@/stores/route'

import ChevronCircleDown from '@primeicons/vue/chevron-circle-down'
import MapMarker from '@primeicons/vue/map-marker'

import type { BusStop } from '@/types'

const props = defineProps<{
  stop: BusStop
}>()

const root = ref<HTMLElement | null>(null)

defineExpose({
  root,
})

const routeStore = useRouteStore()

const isBoarding = computed(() => {
  const boardingEndSequence = routeStore.route?.boardingEndSequence

  if (boardingEndSequence === undefined) {
    return false
  }

  return boardingEndSequence >= props.stop.stopSequence
})

const isStopLabelVisible = computed(() => {
  if (!props.stop.stopNumber) {
    return false
  }

  const selectedStop = isBoarding.value ? routeStore.selectedStartStop : routeStore.selectedEndStop

  if (!selectedStop) {
    return true
  }

  return selectedStop.stopId === props.stop.stopId
})

const selectStop = () => {
  if (!isBoarding.value && !routeStore.selectedStartStop) {
    return
  }

  if (isBoarding.value) {
    routeStore.selectedStartStop = props.stop
  } else {
    routeStore.selectedEndStop = props.stop
  }
}
</script>

<style scoped></style>
