import type { SVGAnimationAttributes } from '../../attributes'
import type { SVGBaseAnimationItem } from '.'

export interface SVGAnimateItem extends SVGBaseAnimationItem {
  tag: 'Animate'
  props: SVGAnimationAttributes
}
