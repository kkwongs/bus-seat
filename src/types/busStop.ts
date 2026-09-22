type Yn = 'Y' | 'N'

export interface BusStop {
  stopId: number
  stopName: string
  stopNumber?: string
  stopSequence: number
  turnYn?: Yn
  centerYn?: string
  districtCd?: number
  regionName?: string
  x?: number
  y?: number
  adminName?: string
  turnSeq: number
  arrivalTime?: Record<string, string>
}
