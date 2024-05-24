import type { SVGBaseItem } from '..'
import type { SVGAnimateItem } from './animate'
import type { SVGAnimateMotionItem } from './animateMotion'
import type { SVGAnimateTransformItem } from './animateTransform'
import type { SVGMpathItem } from './mpath'
import type { SVGSetItem } from './set'

export interface SVGBaseAnimationItem extends SVGBaseItem {
  type: 'Animation'
}

export * from './animate'
export * from './animateMotion'
export * from './animateTransform'
export * from './mpath'
export * from './set'

export type SVGAnimationItem = SVGAnimateItem | SVGAnimateMotionItem | SVGAnimateTransformItem | SVGMpathItem | SVGSetItem
