import type { SVGAnimationAdditionAttributes, SVGAnimationTargetAttributes, SVGAnimationTimingAttributes, SVGAnimationValueAttributes } from '../../attributes'
import type { SVGBaseAnimationItem } from '.'

export interface SVGAnimateMotionItem extends SVGBaseAnimationItem {
  tag: 'AnimateMotion'
  props: SVGAnimationAdditionAttributes & SVGAnimationTargetAttributes & SVGAnimationTimingAttributes & SVGAnimationValueAttributes & {
    keyPoints?: number | number[]
    path?: string
    rotate?: number | 'auto' | 'auto-reverse'
  }
}
