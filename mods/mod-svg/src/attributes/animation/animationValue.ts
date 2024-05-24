import type { SVGBaseAttributes } from '../index'
import type { AnimatableValue } from '../../interfaces'

export interface SVGAnimationValueAttributes extends SVGBaseAttributes {
  calcMode?: 'discrete' | 'linear' | 'paced' | 'spline'
  values?: string
  keyTimes?: number | number[]
  keySplines?: [number, number, number, number] | [number, number, number, number][]
  from?: AnimatableValue
  to?: AnimatableValue
  by?: AnimatableValue
}
