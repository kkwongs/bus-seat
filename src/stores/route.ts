import { defineStore } from 'pinia'
import { ref } from 'vue'

import * as routeApi from '@/services/api/route'

import type { RouteList, RouteSearch } from '@/types'

export const useRouteStore = defineStore('route', () => {
  const isLoading = ref<boolean>(false)
  const errorMessage = ref<string>('')
  const routes = ref<RouteList[]>([])

  const fetchRoutes = async (params: RouteSearch = {}) => {
    isLoading.value = true
    errorMessage.value = ''

    try {
      const { data } = await routeApi.getRoutes(params)

      routes.value = data.items
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : '즐겨찾기 삭제에 실패했습니다.'
    } finally {
      isLoading.value = false
    }
  }

  return { isLoading, errorMessage, routes, fetchRoutes }
})
