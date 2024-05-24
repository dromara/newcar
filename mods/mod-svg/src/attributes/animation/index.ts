import type { SVGAnimationAdditionAttributes } from './animationAddition'
import type { SVGAnimationAttributeTargetAttributes } from './animationAttributeTarget'
import type { SVGAnimationTargetAttributes } from './animationTarget'
import type { SVGAnimationTimingAttributes } from './animationTiming'
import type { SVGAnimationValueAttributes } from './animationValue'

export * from './animationAddition'
export * from './animationAttributeTarget'
export * from './animationTarget'
export * from './animationTiming'
export * from './animationValue'

export type SVGAnimationAttributes = SVGAnimationAdditionAttributes & SVGAnimationAttributeTargetAttributes
  & SVGAnimationTargetAttributes & SVGAnimationTimingAttributes & SVGAnimationValueAttributes
