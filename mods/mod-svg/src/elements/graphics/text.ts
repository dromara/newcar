import type { SVGGenericConditionalProcessingAttributes, SVGGenericCoreAttributes, SVGPresentationAttributes } from '../../attributes'
import type { SVGLengthValue, SVGPercentageValue } from '../../interfaces'
import type { SVGBaseGraphicsItem } from '.'

export interface SVGTextItem extends SVGBaseGraphicsItem {
  tag: 'Text'
  props: SVGGenericConditionalProcessingAttributes & SVGGenericCoreAttributes & SVGPresentationAttributes & {
    x?: SVGLengthValue | SVGPercentageValue
    y?: SVGLengthValue | SVGPercentageValue
    dx?: SVGLengthValue | SVGPercentageValue
    dy?: SVGLengthValue | SVGPercentageValue
    rotate?: number[]
    lengthAdjust?: 'spacing' | 'spacingAndGlyphs'
    textLength?: SVGLengthValue | SVGPercentageValue
  }
}
