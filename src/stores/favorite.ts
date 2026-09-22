import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { FavoriteRoute, CreateFavoriteRoute, UpdateFavoriteNotification } from '@/types'

import {
  getFavoriteRoutes,
  addFavoriteRoute,
  deleteFavoriteRoute,
  updateFavoriteNotification,
} from '@/services/api/favorite'

export const useFavoriteStore = defineStore('favorite', () => {
  const favoriteRoutes = ref<FavoriteRoute[]>([])
  const isLoading = ref(false)
  const errorMessage = ref<string>('')

  const loadFavoriteRoutes = async () => {
    isLoading.value = true
    errorMessage.value = ''

    try {
      favoriteRoutes.value = await getFavoriteRoutes()
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : '노선을 불러오지 못했습니다.'
    } finally {
      isLoading.value = false
    }
  }

  const addFavorite = async (data: CreateFavoriteRoute) => {
    try {
      await addFavoriteRoute(data)
      await loadFavoriteRoutes()
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : '즐겨찾기 추가에 실패했습니다.'
    }
  }

  const deleteFavorite = async (favoriteId: number) => {
    try {
      await deleteFavoriteRoute(favoriteId)
      await loadFavoriteRoutes()
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : '즐겨찾기 삭제에 실패했습니다.'
    }
  }

  const updateNotification = async (favoriteId: number, data: UpdateFavoriteNotification) => {
    try {
      await updateFavoriteNotification(favoriteId, data)
      await loadFavoriteRoutes()
    } catch (error) {
      errorMessage.value =
        error instanceof Error ? error.message : '즐겨찾기 알람 수정에 실패했습니다.'
    }
  }

  return {
    favoriteRoutes,
    isLoading,
    loadFavoriteRoutes,
    addFavorite,
    deleteFavorite,
    updateNotification,
  }
})
