import type { SVGBaseItem } from '..'
import type { SVGCircleItem } from './circle'
import type { SVGEllipseItem } from './ellipse'
import type { SVGImageItem } from './image'
import type { SVGLineItem } from './line'
import type { SVGPathItem } from './path'
import type { SVGPolygonItem } from './polygon'
import type { SVGRectItem } from './rect'
import type { SVGTextItem } from './text'
import type { SVGUseItem } from './use'

export interface SVGBaseGraphicsItem extends SVGBaseItem {
  type: 'Graphics'
}

export * from './circle'
export * from './ellipse'
export * from './image'
export * from './line'
export * from './path'
export * from './polygon'
export * from './rect'
export * from './text'
export * from './use'

export type SVGGraphicsItem = SVGCircleItem | SVGEllipseItem | SVGImageItem | SVGLineItem | SVGPathItem | SVGPolygonItem | SVGRectItem | SVGTextItem | SVGUseItem
