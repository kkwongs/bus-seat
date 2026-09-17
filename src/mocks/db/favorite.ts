import { isFavoriteExists } from '@/utils/favorite'

import type { FavoriteRoute, CreateFavoriteRoute } from '@/types'

const FAVORITE_STORAGE_KEY = 'bus-seat-favorites'

export const getFavorites = (): FavoriteRoute[] => {
  const items = localStorage.getItem(FAVORITE_STORAGE_KEY)

  if (!items) {
    return []
  }

  try {
    return JSON.parse(items) as FavoriteRoute[]
  } catch {
    localStorage.removeItem(FAVORITE_STORAGE_KEY)

    return []
  }
}

export const addFavorite = (
  createFavorite: CreateFavoriteRoute,
): FavoriteRoute | CreateFavoriteRoute => {
  const favorites = getFavorites()

  const exists = isFavoriteExists(favorites, createFavorite)

  if (exists) {
    return createFavorite
  }

  const favoriteId =
    favorites.length > 0 ? Math.max(...favorites.map((favorite) => favorite.favoriteId)) + 1 : 1

  const { boardingStop, alightingStop } = createFavorite

  const favorite = {
    favoriteId,
    ...createFavorite,
    boardingStop: { ...boardingStop, isNotification: false },
    alightingStop: { ...alightingStop, isNotification: false },
  }

  const nextFavorites = [...favorites, favorite]

  localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify(nextFavorites))

  return favorite
}

export const removeFavorite = (favoriteId: number): boolean => {
  const favorites = getFavorites()

  const nextFavorites = favorites.filter((favorite) => favorite.favoriteId !== favoriteId)

  if (nextFavorites.length === favorites.length) {
    return false
  }

  localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify(nextFavorites))

  return true
}
