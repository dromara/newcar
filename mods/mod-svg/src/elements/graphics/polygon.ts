import type { SVGGenericConditionalProcessingAttributes, SVGGenericCoreAttributes, SVGPresentationAttributes } from '../../attributes'
import type { SVGBaseGraphicsItem } from '.'

export interface SVGPolygonItem extends SVGBaseGraphicsItem {
  tag: 'Polygon'
  props: SVGGenericConditionalProcessingAttributes & SVGGenericCoreAttributes & SVGPresentationAttributes & {
    points?: [number, number][]
    pathLength?: number
  }
}
