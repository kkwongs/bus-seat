import { defineStore } from 'pinia'
import { ref } from 'vue'

import * as routeApi from '@/services/api/route'

import type { Route, RouteList, RouteSearch } from '@/types'

export const useRouteStore = defineStore('route', () => {
  const isLoading = ref<boolean>(false)
  const errorMessage = ref<string>('')
  const routes = ref<RouteList[]>([])
  const route = ref<Route | null>(null)
  const selectedStartStop = ref()
  const selectedEndStop = ref()

  /**
   * Replaces the route summaries using the supplied search and records request failures in the
   * store instead of propagating them.
   */
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

  /**
   * Loads one route into the store, records request failures, and clears the loading state when the
   * request settles.
   */
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

  /** Clears the current route detail and both selected stops. */
  const $reset = () => {
    route.value = null
    selectedStartStop.value = undefined
    selectedEndStop.value = undefined
  }

  return {
    isLoading,
    errorMessage,
    routes,
    route,
    selectedStartStop,
    selectedEndStop,
    fetchRoutes,
    fetchRoute,
    $reset,
  }
})
