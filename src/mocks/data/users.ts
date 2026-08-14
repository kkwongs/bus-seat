import type { User } from '@/types'

interface MockUser extends User {
  password: string
}

export const users: MockUser[] = [
  {
    id: 'user-001',
    name: '홍길동',
    email: 'user@example.com',
    password: 'password123!',
    role: 'USER',
  },
  {
    id: 'user-002',
    name: '권기현',
    email: 'gihyun@busseat.com',
    password: 'password123!@',
    role: 'USER',
  },
  {
    id: 'admin-001',
    name: '관리자',
    email: 'admin@example.com',
    password: 'admin1234@',
    role: 'ADMIN',
  },
]
