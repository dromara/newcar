import type { SVGGenericConditionalProcessingAttributes, SVGGenericCoreAttributes, SVGPresentationAttributes } from '../../attributes'
import type { SVGCoordinateValue, SVGLengthValue, SVGURLValue } from '../../interfaces'
import type { SVGBaseGraphicsItem } from '.'

export interface SVGUseItem extends SVGBaseGraphicsItem {
  tag: 'Use'
  props: SVGGenericConditionalProcessingAttributes & SVGGenericCoreAttributes & SVGPresentationAttributes & {
    x?: SVGCoordinateValue
    y?: SVGCoordinateValue
    width?: SVGLengthValue
    height?: SVGLengthValue
    href?: SVGURLValue
  }
}
