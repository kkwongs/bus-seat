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
            <p class="px-3">{{ routeStore.startStopName }}</p>
          </div>

          <div class="inline-flex rounded-full bg-slate-200 p-2">
            <ArrowRight class="text-slate-600" />
          </div>

          <div class="space-y-0.5 self-start text-center">
            <p class="text-sm text-slate-500">종점</p>
            <p class="px-3">{{ routeStore.endStopName }}</p>
          </div>
        </div>

        <div class="-mx-4 bg-slate-200 py-2">
          <div
            class="divide-y divide-slate-200 bg-white *:grid *:grid-cols-[120px_auto] *:px-4 *:py-3"
          >
            <div>
              <span class="text-slate-600">금액</span>
              <span>{{ routeStore.route.fare }}원</span>
            </div>
            <div>
              <span class="text-slate-600">기점출발</span>
              <span>{{ seletedDepartureTime }}</span>
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
            <div class="inline-flex items-center gap-x-1">
              <span class="font-medium">출발지를 선택하세요</span>
              <button
                v-if="seletedStartStop"
                class="rounded border border-sky-600 px-1.5 py-0.5 text-sm text-sky-600"
              >
                정류장 재선택
              </button>
            </div>

            <div class="inline-flex items-center gap-x-1">
              <span class="inline-flex items-center text-sm"
                ><ExclamationCircle class="text-slate-400" />운행시간 안내</span
              >
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
              />
            </ul>
          </div>

          <p class="py-5 text-sm text-slate-600">
            * 정류장 시간은 '평균도착시간'으로 실제 도착시간과 차이가 있을 수 있습니다. 실시간 위치
            정보를 함께 참고하여 이용 바랍니다.
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import ArrowRight from '@primeicons/vue/arrow-right'
import ExclamationCircle from '@primeicons/vue/exclamation-circle'
import Refresh from '@primeicons/vue/refresh'

import RouteStop from '@/components/RouteStop.vue'

import { useRouteStore } from '@/stores/route'

const props = defineProps<{
  routeId: string
}>()

const routeStore = useRouteStore()

const routeStopRef = ref<InstanceType<typeof RouteStop>[]>([])
const routeStopRefHeight = ref(0)
const seletedStartStop = ref(null)

const fetchRoute = async () => {
  await routeStore.fetchRoute(props.routeId)

  if (routeStopRef.value[0].root) {
    routeStopRefHeight.value = routeStopRef.value[0].root.getBoundingClientRect().height
  }
}

const seletedDepartureTime = computed(() => {
  return routeStore.route?.departureTimes[0]
})

onMounted(fetchRoute)
onBeforeUnmount(routeStore.$reset)
</script>

<style scoped></style>
