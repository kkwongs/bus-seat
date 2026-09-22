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
              <p>{{ routeStore.selectedStartStop?.stopName }}</p>
              <p class="text-slate-500">
                {{ routeStore.selectedStartStop?.arrivalTime?.[departureTime] }}
              </p>
            </div>

            <div class="inline-flex size-8 rounded-full bg-slate-200 p-2">
              <ArrowRight class="text-slate-600" :size="16" />
            </div>

            <div class="space-y-0.5 px-2 text-center">
              <p>{{ routeStore.selectedEndStop?.stopName }}</p>
              <p class="text-slate-500">
                {{ routeStore.selectedEndStop?.arrivalTime?.[departureTime] }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex gap-x-2">
          <button
            class="group inline-flex size-10 items-center justify-center rounded-lg border-2 border-slate-200"
            @click="toggleFavorite"
          >
            <Transition>
              <Star v-if="!isFavorite" class="text-slate-400 group-hover:text-sky-600" :size="18" />
              <StarFill v-else class="text-slate-400" :size="18" color="var(--color-sky-600)" />
            </Transition>
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
import { computed } from 'vue'

import Star from '@primeicons/vue/star'
import ArrowRight from '@primeicons/vue/arrow-right'
import StarFill from '@primeicons/vue/star-fill'

import { useRouteStore } from '@/stores/route'
import { useFavoriteStore } from '@/stores/favorite'

import { isFavoriteExists } from '@/utils/favorite'

import type { CreateFavoriteRoute } from '@/types'

interface Props {
  travelTime?: string
  departureTime: string
  routeId: number
}
const props = defineProps<Props>()

const emit = defineEmits<{
  openReservation: []
}>()

const routeStore = useRouteStore()
const favoriteStore = useFavoriteStore()

const createFavorite = computed<CreateFavoriteRoute | null>(() => {
  const { routeId, departureTime } = props
  const { route, selectedStartStop, selectedEndStop } = routeStore

  if (!(
    route &&
    selectedStartStop &&
    selectedEndStop &&
    selectedStartStop.stopNumber &&
    selectedEndStop.stopNumber &&
    selectedStartStop.arrivalTime &&
    selectedEndStop.arrivalTime
  )) {
    return null
  }

  const boardingStop = {
    stopId: selectedStartStop.stopId,
    stopName: selectedStartStop.stopName,
    stopNumber: selectedStartStop.stopNumber,
    arrivalTime: selectedStartStop.arrivalTime[departureTime],
  }

  const alightingStop = {
    stopId: selectedEndStop.stopId,
    stopName: selectedEndStop.stopName,
    stopNumber: selectedEndStop.stopNumber,
    arrivalTime: selectedEndStop.arrivalTime[departureTime],
  }

  return {
    routeId,
    routeName: route.routeName,
    departureTime,
    boardingStop,
    alightingStop,
  }
})

const isFavorite = computed(() => {
  if (!createFavorite.value) {
    return null
  }

  return isFavoriteExists(favoriteStore.favoriteRoutes, createFavorite.value)
})

const removeFavorite = () => {
  const favoriteRoute = createFavorite.value

  if (!favoriteRoute) {
    return alert('즐겨찾기 정보를 확인할 수 없습니다.')
  }

  const favorite = favoriteStore.favoriteRoutes.find(
    (favorite) =>
      favorite.routeId === favoriteRoute.routeId &&
      favorite.departureTime === favoriteRoute.departureTime &&
      favorite.boardingStop.stopId === favoriteRoute.boardingStop.stopId &&
      favorite.alightingStop.stopId === favoriteRoute.alightingStop.stopId,
  )

  if (!favorite) {
    return alert('해당 즐겨찾기를 찾을 수 없습니다.')
  }

  favoriteStore.deleteFavorite(favorite.favoriteId)
}

const addFavorite = () => {
  if (!createFavorite.value) {
    return alert('즐겨찾기 정보를 확인할 수 없습니다.')
  }

  favoriteStore.addFavorite(createFavorite.value)
}

const toggleFavorite = () => {
  if (!isFavorite.value) {
    addFavorite()
  } else {
    removeFavorite()
  }
}

const open = () => {
  emit('openReservation')
}
</script>

<style scoped>
.v-enter-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  width: 0;
  opacity: 0;
}
</style>
