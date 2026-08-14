import { users } from '@/mocks/data'
import { mockDelay } from '.'

import type { LoginRequest, LoginResponse } from '@/types'

export const loginMock = async (req: LoginRequest): Promise<LoginResponse> => {
  await mockDelay()

  const user = users.find((item) => item.email === req.email && item.password === req.password)

  if (!user) {
    throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.')
  }

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken: `mock-token-${user.id}`,
  }
}
