import type { SVGGenericConditionalProcessingAttributes, SVGGenericCoreAttributes, SVGPresentationAttributes } from '../../attributes'
import type { SVGLengthValue, SVGPercentageValue } from '../../interfaces'
import type { SVGBaseGraphicsItem } from '.'

export interface SVGRectItem extends SVGBaseGraphicsItem {
  tag: 'Rect'
  props: SVGGenericConditionalProcessingAttributes & SVGGenericCoreAttributes & SVGPresentationAttributes & {
    x?: SVGLengthValue | SVGPercentageValue
    y?: SVGLengthValue | SVGPercentageValue
    width?: 'auto' | SVGLengthValue | SVGPercentageValue
    height?: 'auto' | SVGLengthValue | SVGPercentageValue
    rx?: 'auto' | SVGLengthValue | SVGPercentageValue
    ry?: 'auto' | SVGLengthValue | SVGPercentageValue
    pathLength?: number
  }
}
