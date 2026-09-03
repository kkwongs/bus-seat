import { env } from '@/constants/env'
import { getMockRoutes } from '@/services/mock/route'

import type { RouteList, RouteSearch, ApiListResponse } from '@/types'

export const getRoutes = async (params: RouteSearch = {}): Promise<ApiListResponse<RouteList>> => {
  if (env.useMock) {
    return getMockRoutes(params)
  }

  throw new Error('실제 노선 조회 API가 아직 구현되지 않았습니다.')
}
