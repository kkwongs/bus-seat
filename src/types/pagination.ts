export interface Pagination {
  page: number
  size: number
  total: number
}

export interface PaginatedResponse<T> {
  items: T[]
  pagination?: Pagination
}
