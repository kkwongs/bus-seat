import { routes } from '@/mocks/data'
import { mockDelay } from '.'

import type { RouteList, RouteSearch, ApiListResponse } from '@/types'

export const getMockRoutes = async (params: RouteSearch): Promise<ApiListResponse<RouteList>> => {
  await mockDelay()

  const { keyword } = params

  const filteredRoutes = keyword
    ? routes.filter((route) => route.routeName.includes(keyword))
    : routes

  return {
    data: {
      items: filteredRoutes.map(
        ({ routeId, routeName, startStopName, endStopName, departureTimes }) => ({
          routeId,
          routeName,
          startStopName,
          endStopName,
          departureTimes,
        }),
      ),
    },
    status: 200,
  }
}
