import type { FavoriteRoute, CreateFavoriteRoute } from '@/types'

export const getFavoriteRoutes = async (): Promise<FavoriteRoute[]> => {
  const response = await fetch('/api/favorites', { method: 'GET' })

  return response.json()
}

export const addFavoriteRoute = async (request: CreateFavoriteRoute): Promise<FavoriteRoute[]> => {
  const response = await fetch('/api/favorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  return response.json()
}

export const deleteFavoriteRoute = async (favoriteId: number) => {
  await fetch(`/api/favorites/${favoriteId}`, { method: 'DELETE' })
}
