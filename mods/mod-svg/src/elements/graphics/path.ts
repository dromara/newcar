import type { SVGGenericConditionalProcessingAttributes, SVGGenericCoreAttributes, SVGPresentationAttributes } from '../../attributes'
import type { SVGBaseGraphicsItem } from '.'

export interface SVGPathItem extends SVGBaseGraphicsItem {
  tag: 'Path'
  props: SVGGenericConditionalProcessingAttributes & SVGGenericCoreAttributes & SVGPresentationAttributes & {
    d?: string
    pathLength?: number
  }
}
