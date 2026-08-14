import { env } from '@/constants/env'
import { loginMock } from '@/services/mock/auth'

import type { LoginRequest, LoginResponse } from '@/types'

export const login = async (req: LoginRequest): Promise<LoginResponse> => {
  if (env.useMock) {
    return loginMock(req)
  }

  throw new Error('실제 로그인 API가 아직 구현되지 않았습니다.')
}
