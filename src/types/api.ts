import type { PaginatedResponse } from '.'

export interface ApiResponse<T> {
  data: T
  message?: string
  status: number
}

export interface ApiListResponse<T> {
  data: PaginatedResponse<T>
  status: number
}
