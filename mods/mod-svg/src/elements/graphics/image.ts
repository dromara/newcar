import type { SVGGenericConditionalProcessingAttributes, SVGGenericCoreAttributes, SVGPresentationAttributes } from '../../attributes'
import type { SVGLengthValue, SVGPercentageValue, SVGURLValue } from '../../interfaces'
import type { SVGBaseGraphicsItem } from '.'

export interface SVGImageItem extends SVGBaseGraphicsItem {
  tag: 'Image'
  props: SVGGenericConditionalProcessingAttributes & SVGGenericCoreAttributes & SVGPresentationAttributes & {
    x?: SVGLengthValue | SVGPercentageValue
    y?: SVGLengthValue | SVGPercentageValue
    width: 'auto' | SVGLengthValue | SVGPercentageValue
    height: 'auto' | SVGLengthValue | SVGPercentageValue
    href?: SVGURLValue
    preserveAspectRatio?: 'none' | 'xMinYMin' | 'xMidYMin' | 'xMaxYMin'
    | 'xMinYMid' | 'xMidYMid' | 'xMaxYMid'
    | 'xMinYMax' | 'xMidYMax' | 'xMaxYMax' | 'meet' | 'slice'
    crossOrigin?: 'anonymous' | 'use-credentials'
    decoding?: 'sync' | 'async' | 'auto'
  }
}
