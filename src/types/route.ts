import type { BusStop } from '.'

export interface Route {
  routeId: number
  routeName: string
  startStopName: string
  endStopName: string
  departureTimes: string[]
  fare: number
  boardingEndSequence: number
  alightingStartSequence: number
  stops: BusStop[]
}

export interface RouteList {
  routeId: number
  routeName: string
  startStopName: string
  endStopName: string
  departureTimes: string[]
}

export interface RouteSearch {
  keyword?: string
}
