import { routes } from '@/mocks/data'
import { mockDelay } from '.'

import type { RouteList, RouteSearch, Route, ApiListResponse, ApiResponse } from '@/types'

const searchableRoutes = routes.map((route) => ({
  route,
  searchText: [route.routeName, ...route.stops.map((stop) => stop.stopName)].join(' '),
}))

/**
 * Returns mock route summaries whose route or stop names contain the keyword, or all summaries
 * when no keyword is supplied.
 */
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

/**
 * Looks up a mock route after a simulated delay, returning a 404 response with null data when its
 * numeric identifier is not found.
 */
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
