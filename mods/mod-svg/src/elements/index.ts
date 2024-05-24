import type { Widget } from '@newcar/core'
import type { SVGBaseAttributes } from '../attributes'
import type { SVGAnimationItem } from './animation'
import type { SVGGraphicsItem } from './graphics'

export interface SVGBaseItem {
  tag: string
  type: string
  props?: SVGBaseAttributes
  children?: SVGItem[]
  bind?: Widget
}

export * from './animation'
export * from './graphics'

export type SVGItem = SVGAnimationItem | SVGGraphicsItem
