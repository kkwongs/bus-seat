export interface FavoriteRoute {
  favoriteId: number
  routeId: number
  routeName: string
  departureTime: string
  boardingStop: FavoriteStop
  alightingStop: FavoriteStop
}

export interface FavoriteStop {
  stopId: number
  stopName: string
  stopNumber: string
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
