<template>
  <div ref="root" class="relative flex h-18 gap-x-0.5">
    <div class="z-10 inline-flex gap-x-3 pt-4 text-slate-500">
      <ChevronCircleDown :size="14" class="bg-white text-slate-400" /> <MapMarker :size="16" />
    </div>

    <div class="flex flex-1 items-center justify-between gap-1 border-b border-slate-300 py-3">
      <div class="flex-1 space-y-1">
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
        class="rounded-2xl border px-3 py-1 text-sm"
        :class="boardingAlightingClass"
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

const emit = defineEmits(['selectStartStop'])

const root = ref<HTMLElement | null>(null)

defineExpose({
  root,
})

const routeStore = useRouteStore()

const boardingAlightingClass = computed(() => {
  if (
    props.stop.stopId === routeStore.selectedStartStop?.stopId ||
    props.stop.stopId === routeStore.selectedEndStop?.stopId
  ) {
    return ['border-sky-600 bg-sky-600 font-medium text-white']
  } else {
    return ['border-slate-300 text-slate-300']
  }
})

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
  if (!isBoarding.value) {
    if (!routeStore.selectedStartStop) {
      return
    }

    if (routeStore.selectedEndStop) {
      routeStore.selectedEndStop = undefined
    } else {
      routeStore.selectedEndStop = props.stop
    }

    return
  }

  if (routeStore.selectedStartStop) {
    routeStore.selectedStartStop = undefined
    routeStore.selectedEndStop = undefined
    return
  }

  routeStore.selectedStartStop = props.stop
  emit('selectStartStop')
}
</script>

<style scoped></style>
