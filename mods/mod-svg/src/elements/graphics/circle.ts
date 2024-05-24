import type { SVGGenericConditionalProcessingAttributes, SVGGenericCoreAttributes, SVGPresentationAttributes } from '../../attributes'
import type { SVGLengthValue, SVGPercentageValue } from '../../interfaces'
import type { SVGBaseGraphicsItem } from '.'

export interface SVGCircleItem extends SVGBaseGraphicsItem {
  tag: 'Circle'
  props: SVGGenericConditionalProcessingAttributes & SVGGenericCoreAttributes & SVGPresentationAttributes & {
    cx?: SVGLengthValue | SVGPercentageValue | number
    cy?: SVGLengthValue | SVGPercentageValue | number
    r?: SVGLengthValue | SVGPercentageValue | number
    pathLength?: number
  }
}
