import { env } from '@/constants/env'
import { getMockRoutes } from '@/services/mock/route'

import type { RouteList, ApiResponse } from '@/types'

export const getRoutes = async (): Promise<ApiResponse<RouteList[]>> => {
  if (env.useMock) {
    return getMockRoutes()
  }

  throw new Error('실제 노선 조회 API가 아직 구현되지 않았습니다.')
}
