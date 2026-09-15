import { routes } from '@/mocks/data'
import { mockDelay } from '.'

import type { RouteList, RouteSearch, Route, ApiListResponse, ApiResponse } from '@/types'

const searchableRoutes = routes.map((route) => ({
  route,
  searchText: [route.routeName, ...route.stops.map((stop) => stop.stopName)].join(' '),
}))

export const getMockRoutes = async (params: RouteSearch): Promise<ApiListResponse<RouteList>> => {
  const { keyword } = params

  const filteredRoutes = keyword
    ? searchableRoutes
        .filter(({ searchText }) => searchText.includes(keyword))
        .map(({ route }) => route)
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

export const getMockRoute = async (routeId: string): Promise<ApiResponse<Route | null>> => {
  await mockDelay(100)

  const filteredRoute = routes.find((route) => route.routeId === Number(routeId))

  if (!filteredRoute) {
    return { data: null, status: 404 }
  }

  return {
    data: filteredRoute,
    status: 200,
  }
}
