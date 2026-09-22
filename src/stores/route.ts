import { defineStore } from 'pinia'
import { ref } from 'vue'

import * as routeApi from '@/services/api/route'

import type { Route, RouteList, RouteSearch, BusStop } from '@/types'

export const useRouteStore = defineStore('route', () => {
  const isLoading = ref<boolean>(false)
  const errorMessage = ref<string>('')
  const routes = ref<RouteList[]>([])
  const route = ref<Route | null>(null)
  const selectedStartStop = ref<BusStop>()
  const selectedEndStop = ref<BusStop>()
  const departureTime = ref<string>('')

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

  const fetchRoute = async (routeId: number) => {
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
    selectedStartStop.value = undefined
    selectedEndStop.value = undefined
    departureTime.value = ''
  }

  return {
    isLoading,
    errorMessage,
    routes,
    route,
    selectedStartStop,
    selectedEndStop,
    departureTime,
    fetchRoutes,
    fetchRoute,
    $reset,
  }
})
