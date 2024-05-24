import type { SVGGenericConditionalProcessingAttributes, SVGGenericCoreAttributes, SVGPresentationAttributes } from '../../attributes'
import type { SVGLengthValue, SVGPercentageValue } from '../../interfaces'
import type { SVGBaseGraphicsItem } from '.'

export interface SVGEllipseItem extends SVGBaseGraphicsItem {
  tag: 'Ellipse'
  props: SVGGenericConditionalProcessingAttributes & SVGGenericCoreAttributes & SVGPresentationAttributes & {
    cx?: SVGLengthValue | SVGPercentageValue | number
    cy?: SVGLengthValue | SVGPercentageValue | number
    rx?: SVGLengthValue | SVGPercentageValue | number
    ry?: SVGLengthValue | SVGPercentageValue | number
    pathLength?: number
  }
}
