import { http, HttpResponse } from 'msw'
import { getFavorites, addFavorite, removeFavorite } from '@/mocks/db/favorite'
import type { CreateFavoriteRoute } from '@/types'

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
]
