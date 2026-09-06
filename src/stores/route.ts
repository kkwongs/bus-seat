import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import * as routeApi from '@/services/api/route'

import type { Route, RouteList, RouteSearch } from '@/types'

export const useRouteStore = defineStore('route', () => {
  const isLoading = ref<boolean>(false)
  const errorMessage = ref<string>('')
  const routes = ref<RouteList[]>([])
  const route = ref<Route | null>(null)
  const selectedStartStop = ref()
  const selectedEndStop = ref()

  const startStopName = computed(() => {
    if (!route.value) {
      return
    }

    return route.value.stops[0].stopName
  })
  const endStopName = computed(() => {
    return route.value?.stops.at(-1)?.stopName
  })

  const fetchRoutes = async (params: RouteSearch = {}) => {
    isLoading.value = true
    errorMessage.value = ''

    try {
      const { data } = await routeApi.getRoutes(params)

      routes.value = data.items
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : '노선 조회에 실패했습니다.'
    } finally {
      isLoading.value = false
    }
  }

  const fetchRoute = async (routeId: string) => {
    try {
      const { data } = await routeApi.getRoute(routeId)
      route.value = data
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : '노선 조회에 실패했습니다.'
    } finally {
      isLoading.value = false
    }
  }

  const $reset = () => {
    route.value = null
  }

  return {
    isLoading,
    errorMessage,
    routes,
    route,
    startStopName,
    endStopName,
    selectedStartStop,
    selectedEndStop,
    fetchRoutes,
    fetchRoute,
    $reset,
  }
})
