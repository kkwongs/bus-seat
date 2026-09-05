import { env } from '@/constants/env'
import { getMockRoutes, getMockRoute } from '@/services/mock/route'

import type { RouteList, RouteSearch, Route, ApiListResponse, ApiResponse } from '@/types'

export const getRoutes = async (params: RouteSearch = {}): Promise<ApiListResponse<RouteList>> => {
  if (env.useMock) {
    return getMockRoutes(params)
  }

  throw new Error('실제 노선 조회 API가 아직 구현되지 않았습니다.')
}

export const getRoute = async (routeId: string): Promise<ApiResponse<Route | null>> => {
  if (env.useMock) {
    return getMockRoute(routeId)
  }

  throw new Error('실제 노선 조회 API가 아직 구현되지 않았습니다.')
}
