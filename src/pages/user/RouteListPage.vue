<template>
  <div>
    <header class="mb-8">
      <h1 class="text-2xl font-bold">Search</h1>

      <input
        id="searchKeyword"
        ref="searchInputRef"
        type="search"
        name="searchKeyword"
        placeholder="노선 및 정류장을 검색하세요."
        class="mt-2 w-full border-b bg-white bg-[url(@/assets/searchicon.png)] bg-size-[16px] bg-position-[center_right_0.5rem] bg-no-repeat p-2 text-sm placeholder:text-slate-500 focus:outline-0"
        :class="{ 'bg-none': searchKeyword }"
        :value="searchKeyword"
        @input="handleSearchInput"
      />
    </header>

    <div
      v-if="routeStore.isLoading"
      class="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500"
    >
      노선 정보를 불러오는 중입니다.
    </div>

    <div
      v-else-if="routeStore.errorMessage"
      class="rounded-xl border border-red-100 bg-red-50 p-6 text-sm text-red-600"
    >
      {{ routeStore.errorMessage }}
    </div>

    <div
      v-else-if="!visibleRoutes.length"
      class="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500"
    >
      검색된 노선이 없습니다.
    </div>

    <div v-else class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <RouterLink
        v-for="route in visibleRoutes"
        :key="route.routeId"
        :to="{
          name: 'user-route-detail',
          params: {
            routeId: route.routeId,
          },
        }"
        class="block rounded-xl border border-slate-200 px-3 py-4 transition hover:scale-105 hover:border-sky-900 hover:shadow-sm"
      >
        <div class="flex flex-col gap-2">
          <div>
            <span class="rounded-md bg-sky-50 px-2 py-1 font-bold">
              {{ route.busCode }}{{ route.busNumber }}{{ route.operationType }}
            </span>
          </div>

          <div class="text-sm">
            {{ route.startStopName }}
            <span class="mx-1"> → </span>
            {{ route.endStopName }}
          </div>

          <div class="text-xs">
            <p class="text-slate-400">기점 출발</p>

            <p class="mt-1 font-semibold text-sky-600">
              {{ route.departureTime }}
            </p>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import type { RouteList, RouteSearch } from '@/types'

import { useRouteStore } from '@/stores/route'

const routeStore = useRouteStore()

interface RouteView extends RouteList {
  busCode: string
  busNumber: string
  operationType: string
  departureTime: string
}

const searchKeyword = ref('')
const searchInputRef = ref<HTMLInputElement | null>(null)

const formatDepartureTime = (times: string[]) => {
  if (!times) return
  return times.length > 3 ? `${times[0]} ~ ${times.at(-1)}` : times.join(' / ')
}

watch(searchKeyword, () => {
  searchRoutes() // debounce 적용
})

const searchRoutes = () => {
  const params: RouteSearch = {
    keyword: searchKeyword.value,
  }
  routeStore.fetchRoutes(params)
}

const handleSearchInput = (event: Event) => {
  const inputEl = event.target as HTMLInputElement
  searchKeyword.value = inputEl.value
}

const focusSearchInput = () => {
  searchInputRef.value?.focus()
}

const visibleRoutes = computed<RouteView[]>(() =>
  routeStore.routes.map((route) => {
    const [busCode, busNumber, operationType] = route.routeName.split(/(\d+)/)

    return {
      ...route,
      busCode,
      busNumber,
      operationType,
      departureTime: formatDepartureTime(route.departureTimes) || '',
    }
  }),
)

const loadRoutes = async () => {
  await routeStore.fetchRoutes()
  focusSearchInput()
}

onMounted(loadRoutes)
</script>
