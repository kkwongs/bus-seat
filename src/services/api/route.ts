import { env } from '@/constants/env'
import { getMockRoutes, getMockRoute } from '@/services/mock/route'

import type { RouteList, RouteSearch, Route, ApiListResponse, ApiResponse } from '@/types'

/**
 * Retrieves route summaries from the configured mock service.
 *
 * @throws {Error} When mock mode is disabled because the live route API is not implemented.
 */
export const getRoutes = async (params: RouteSearch = {}): Promise<ApiListResponse<RouteList>> => {
  if (env.useMock) {
    return getMockRoutes(params)
  }

  throw new Error('실제 노선 조회 API가 아직 구현되지 않았습니다.')
}

/**
 * Retrieves one route from the configured mock service by its route identifier.
 *
 * @throws {Error} When mock mode is disabled because the live route API is not implemented.
 */
export const getRoute = async (routeId: string): Promise<ApiResponse<Route | null>> => {
  if (env.useMock) {
    return getMockRoute(routeId)
  }

  throw new Error('실제 노선 조회 API가 아직 구현되지 않았습니다.')
}
