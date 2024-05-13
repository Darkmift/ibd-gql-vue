type StatusCol = 'success' | 'failed' | 'cancelled'

export type BuildModel = {
  buildId: number
  startTime: string | null
  endTime: string | null
  caption: string
  command: string
  status: StatusCol
  errorsNumber: number | null
  warningsNumber: number | null
}

export type GroupedBuildModel = {
  day: string
  count: number
}

export type BuildsCount = {
  countBuilds: number
}
