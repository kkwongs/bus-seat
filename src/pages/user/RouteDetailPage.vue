<template>
  <div class="flex justify-center">
    <div class="w-full max-w-md space-y-4">
      <div v-if="routeStore.errorMessage">
        {{ routeStore.errorMessage }}
      </div>

      <template v-else-if="routeStore.route">
        <h1 class="text-2xl font-bold">{{ routeStore.route.routeName }}</h1>

        <div
          class="my-6 grid grid-cols-[1fr_auto_1fr] items-center rounded-2xl border-2 border-slate-200 py-4"
        >
          <div class="space-y-0.5 self-start text-center">
            <p class="text-sm text-slate-500">기점</p>
            <p class="px-3">{{ routeStore.route.startStopName }}</p>
          </div>

          <div class="inline-flex rounded-full bg-slate-200 p-2">
            <ArrowRight class="text-slate-600" />
          </div>

          <div class="space-y-0.5 self-start text-center">
            <p class="text-sm text-slate-500">종점</p>
            <p class="px-3">{{ routeStore.route.endStopName }}</p>
          </div>
        </div>

        <div class="-mx-4 bg-slate-200 py-2">
          <div
            class="divide-y divide-slate-200 bg-white *:grid *:grid-cols-[120px_auto] *:px-4 *:py-3"
          >
            <div>
              <span class="text-slate-600">금액</span>
              <span>{{ routeStore.route.fare.toLocaleString('ko-KR') }}원</span>
            </div>
            <div>
              <span class="text-slate-600">기점출발</span>
              <div class="flex items-center justify-between">
                <span>{{ selectedDepartureTime }}</span>
                <button
                  v-if="routeStore.route.departureTimes.length > 1"
                  class="inline-flex rounded-xl py-0.5 pl-1.5 text-sm font-medium text-sky-600"
                  @click="isModalOpen = true"
                >
                  변경 <ChevronRight />
                </button>
              </div>
            </div>
            <div>
              <span class="text-slate-600">예약가능 시간</span>
              <div>
                <p>기점 출발 60분 전까지</p>
                <p class="text-sm text-slate-600">(매일 오전 10시에 7일 후까지 예약오픈)</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="flex justify-between py-4">
            <div class="inline-flex flex-1 flex-wrap items-center gap-1">
              <span class="font-medium">{{ tarvelTimeMessage }}</span>
              <button
                v-if="routeStore.selectedStartStop"
                class="rounded border border-sky-600 px-1.5 py-0.5 text-sm text-sky-600"
                @click="resetSelectedStop"
              >
                정류장 재선택
              </button>
            </div>

            <div class="inline-flex items-center gap-x-1 self-start">
              <span class="inline-flex items-center text-sm">
                <ExclamationCircle class="text-slate-400" />
                <span>운행시간 안내</span>
              </span>
              <button class="rounded border border-slate-400 p-1">
                <Refresh class="text-slate-600" :size="16" />
              </button>
            </div>
          </div>

          <div class="relative">
            <div
              class="absolute top-5.5 left-1.5 border border-slate-200"
              :style="{ height: `calc(100% - ${routeStopRefHeight}px)` }"
            ></div>

            <ul class="relative">
              <RouteStop
                v-for="stop in routeStore.route.stops"
                :key="stop.stopId"
                ref="routeStopRef"
                :stop="stop"
                :selected-departure-time="selectedDepartureTime"
                @select-start-stop="scrollToFirstAlighting"
              />
            </ul>

            <div
              v-if="routeStore.selectedStartStop"
              class="absolute right-6.5"
              :class="{
                'rounded-full border border-sky-600': routeStore.selectedStartStop,
                'transition-[height] duration-300': routeStore.selectedEndStop,
              }"
              :style="{ top: routeLineTop, height: routeLineHeight }"
            >
              <ChevronDown class="absolute -bottom-2.5 -translate-x-1/2 text-sky-600" :size="24" />
            </div>
          </div>

          <p class="pt-4 text-sm text-slate-600">
            * 정류장 시간은 '평균도착시간'으로 실제 도착시간과 차이가 있을 수 있습니다. 실시간 위치
            정보를 함께 참고하여 이용 바랍니다.
          </p>
        </div>
      </template>
    </div>
  </div>

  <DepartureTimeChangeModal
    :is-open="isModalOpen"
    :selected-departure-time="selectedDepartureTime"
    @change-time="changeTime"
    @close="isModalOpen = false"
  />

  <Transition
    enter-active-class="transition-transform duration-300"
    enter-from-class="translate-y-full"
    enter-to-class="translate-y-0"
  >
    <RouteReservationBar
      v-if="travelTime"
      :travel-time="travelTime"
      :departure-time="selectedDepartureTime"
      :route-id="Number(route.params.routeId)"
      @open-reservation="isOpenReservation = true"
    />
  </Transition>

  <ReservationModal
    :open="isOpenReservation"
    :departure-time="selectedDepartureTime"
    @close="isOpenReservation = false"
  />
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import ArrowRight from '@primeicons/vue/arrow-right'
import ExclamationCircle from '@primeicons/vue/exclamation-circle'
import Refresh from '@primeicons/vue/refresh'
import ChevronDown from '@primeicons/vue/chevron-down'
import ChevronRight from '@primeicons/vue/chevron-right'

import RouteStop from './components/RouteStop.vue'
import DepartureTimeChangeModal from './components/DepartureTimeChangeModal.vue'
import RouteReservationBar from './components/RouteReservationBar.vue'
import ReservationModal from './components/ReservationModal.vue'

import { useRouteStore } from '@/stores/route'

const routeStore = useRouteStore()

const route = useRoute()

const routeStopRef = ref<InstanceType<typeof RouteStop>[]>([])
const routeStopRefHeight = ref(0)
const isModalOpen = ref(false)
const isOpenReservation = ref(false)
const selectedDepartureTime = ref<string>('')

const routeLineTop = computed(() => {
  if (routeStore.selectedStartStop) {
    return `${54 + routeStopRefHeight.value * (routeStore.selectedStartStop.stopSequence - 1)}px`
  }

  return '54px'
})

const routeLineHeight = computed(() => {
  const startStop = routeStore.selectedStartStop
  const endStop = routeStore.selectedEndStop

  if (endStop && startStop) {
    const sequenceGap = endStop.stopSequence - startStop.stopSequence

    return `${routeStopRefHeight.value * (sequenceGap - 0.5)}px`
  }

  if (startStop) {
    const alightingStartSequence = routeStore.route?.alightingStartSequence ?? 0

    return `${routeStopRefHeight.value * (alightingStartSequence - startStop.stopSequence - 0.5)}px`
  }

  return '0px'
})

const travelTime = computed(() => {
  if (
    !routeStore.selectedStartStop ||
    !routeStore.selectedEndStop ||
    !selectedDepartureTime.value
  ) {
    return
  }

  if (!(routeStore.selectedStartStop.arrivalTime && routeStore.selectedEndStop.arrivalTime)) {
    return
  }

  const startArrivalTime = routeStore.selectedStartStop.arrivalTime[selectedDepartureTime.value]
  const endArrivalTime = routeStore.selectedEndStop.arrivalTime[selectedDepartureTime.value]

  const [startHour, startMinute] = startArrivalTime.split(':').map(Number)
  const [endHour, endMinute] = endArrivalTime.split(':').map(Number)

  const diff = endHour * 60 + endMinute - (startHour * 60 + startMinute)

  const hours = Math.floor(diff / 60)
  const minutes = diff % 60

  return hours ? `소요시간 ${hours}시간 ${minutes}분` : `소요시간 ${minutes}분`
})

const tarvelTimeMessage = computed(() => {
  if (!routeStore.selectedStartStop) {
    return '출발지를 선택하세요'
  }

  if (!routeStore.selectedEndStop) {
    return '도착지를 선택하세요'
  }

  return travelTime
})

const changeTime = (time: string) => {
  selectedDepartureTime.value = time
  isModalOpen.value = false
}

const resetSelectedStop = () => {
  routeStore.selectedStartStop = undefined
  routeStore.selectedEndStop = undefined
}

const scrollToFirstAlighting = () => {
  if (!routeStore?.route) return

  const firstAlightingStop = routeStopRef.value[routeStore.route.alightingStartSequence - 1].root

  if (!firstAlightingStop) return

  firstAlightingStop.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const fetchRoute = async () => {
  await routeStore.fetchRoute(Number(route.params.routeId))

  if (routeStopRef.value[0].root) {
    routeStopRefHeight.value = routeStopRef.value[0].root.getBoundingClientRect().height
  }

  if (!routeStore.route?.departureTimes) {
    return
  }

  selectedDepartureTime.value = routeStore.departureTime || routeStore.route?.departureTimes[0]
}

onMounted(async () => {
  await fetchRoute()
})
onBeforeUnmount(routeStore.$reset)
</script>

<style scoped></style>
