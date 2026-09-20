import { http, HttpResponse } from 'msw'
import { getFavorites, addFavorite, removeFavorite, updateFavorite } from '@/mocks/db/favorite'
import type { CreateFavoriteRoute, UpdateFavoriteNotification } from '@/types'

export const handlers = [
  http.get('/api/favorites', () => {
    return HttpResponse.json(getFavorites())
  }),

  http.post('/api/favorites', async ({ request }) => {
    const favorite = (await request.json()) as CreateFavoriteRoute

    return HttpResponse.json(addFavorite(favorite), {
      status: 201,
    })
  }),

  http.delete('/api/favorites/:favoriteId', ({ params }) => {
    const favoriteId = Number(params.favoriteId)

    const deleted = removeFavorite(favoriteId)

    if (!deleted) {
      return HttpResponse.json({ message: 'Favorite not found' }, { status: 404 })
    }

    return new HttpResponse(null, {
      status: 204,
    })
  }),

  http.put('/api/favorites/:favoriteId', async ({ params, request }) => {
    const favoriteId = Number(params.favoriteId)

    const data = (await request.json()) as UpdateFavoriteNotification

    const favorite = updateFavorite(favoriteId, data)

    if (!favorite) {
      return HttpResponse.json({ message: 'Favorite not found' }, { status: 404 })
    }

    return HttpResponse.json(favorite)
  }),
]
