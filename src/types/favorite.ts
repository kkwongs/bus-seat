export interface FavoriteRoute {
  favoriteId: number
  routeId: number
  departureTime: string
  boardingStop: FavoriteStop
  alightingStop: FavoriteStop
}

export interface FavoriteStop {
  stopId: number
  stopName: string
  arrivalTime: string
  isNotification: boolean
}

export type CreateFavoriteStop = Omit<FavoriteStop, 'isNotification'>

export interface CreateFavoriteRoute {
  routeId: number
  departureTime: string
  boardingStop: CreateFavoriteStop
  alightingStop: CreateFavoriteStop
}
