import type { FavoriteRoute, CreateFavoriteRoute } from '@/types'

export const isFavoriteExists = (
  favorites: FavoriteRoute[],
  favorite: FavoriteRoute | CreateFavoriteRoute,
): boolean => {
  const { routeId, departureTime, boardingStop, alightingStop } = favorite

  return favorites.some(
    (favorite) =>
      favorite.routeId === routeId &&
      favorite.departureTime === departureTime &&
      favorite.boardingStop.stopId === boardingStop.stopId &&
      favorite.alightingStop.stopId === alightingStop.stopId,
  )
}
