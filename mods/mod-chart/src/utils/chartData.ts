import type { Color } from '@newcar/utils'

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: Color[]
    borderColor?: Color[]
    borderWidth?: number
    borderRadius?: number
  }[]
}
