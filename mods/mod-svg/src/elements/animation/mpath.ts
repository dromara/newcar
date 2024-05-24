import type { SVGAnimationAttributes } from '../../attributes'
import type { SVGBaseAnimationItem } from '.'

export interface SVGMpathItem extends SVGBaseAnimationItem {
  tag: 'Mpath'
  props: SVGAnimationAttributes & {
    type?: 'translate' | 'rotate' | 'scale' | 'skewX' | 'skewY'
  }
}
