import { routes } from '@/mocks/data'
import { mockDelay } from '.'

import type { RouteList, ApiResponse } from '@/types'

export const getMockRoutes = async (): Promise<ApiResponse<RouteList[]>> => {
  await mockDelay()

  return {
    data: routes.map(({ routeId, routeName, startStopName, endStopName, departureTimes }) => ({
      routeId,
      routeName,
      startStopName,
      endStopName,
      departureTimes,
    })),
    status: 200,
  }
}
