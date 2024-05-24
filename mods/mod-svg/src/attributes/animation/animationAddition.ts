import type { SVGBaseAttributes } from '../index'

export interface SVGAnimationAdditionAttributes extends SVGBaseAttributes {
  additive?: 'replace' | 'sum'
  accumulate?: 'none' | 'sum'
}
