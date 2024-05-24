import type { SVGGenericConditionalProcessingAttributes, SVGGenericCoreAttributes, SVGPresentationAttributes } from '../../attributes'
import type { SVGLengthValue, SVGPercentageValue } from '../../interfaces'
import type { SVGBaseGraphicsItem } from '.'

export interface SVGLineItem extends SVGBaseGraphicsItem {
  tag: 'Line'
  props: SVGGenericConditionalProcessingAttributes & SVGGenericCoreAttributes & SVGPresentationAttributes & {
    x1?: SVGLengthValue | SVGPercentageValue | number
    y1?: SVGLengthValue | SVGPercentageValue | number
    x2?: SVGLengthValue | SVGPercentageValue | number
    y2?: SVGLengthValue | SVGPercentageValue | number
    pathLength?: number
  }
}
