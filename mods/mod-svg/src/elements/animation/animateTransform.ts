import type { SVGAnimationAttributes } from '../../attributes'
import type { SVGBaseAnimationItem } from '.'

export interface SVGAnimateTransformItem extends SVGBaseAnimationItem {
  tag: 'AnimateTransform'
  props: SVGAnimationAttributes & {
    type?: 'translate' | 'rotate' | 'scale' | 'skewX' | 'skewY'
  }
}
