import type { SVGAnimationAttributeTargetAttributes, SVGAnimationTargetAttributes, SVGAnimationTimingAttributes } from '../../attributes'
import type { SVGBaseAnimationItem } from '.'

export interface SVGSetItem extends SVGBaseAnimationItem {
  tag: 'Set'
  props: SVGAnimationAttributeTargetAttributes & SVGAnimationTargetAttributes & SVGAnimationTimingAttributes
}
