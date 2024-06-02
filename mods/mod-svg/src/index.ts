/* eslint-disable no-case-declarations */
import type { WidgetOptions, WidgetStyle } from '@newcar/core'
import { Widget } from '@newcar/core'
import { Circle, Line, Path, Rect } from '@newcar/basic'
import type { Color } from '../../../packages/utils/src'
import { isUndefined } from '../../../packages/utils/src'
import type { SVGItem } from './elements'
import { transform } from './transform'

export interface SVGOptions extends WidgetOptions {
  style?: SVGStyle
}

export interface SVGStyle extends WidgetStyle { }

export default class SVG extends Widget {
  private tree: any

  constructor(public svg: string, options?: SVGOptions) {
    options ??= {}
    super(options)
    this.tree = transform(svg)
  }

  private processSVGItem(item: SVGItem) {
    switch (item.tag) {
      case 'Circle':
        const circle = new Circle(item.props.r, {
          x: item.props.cx,
          y: item.props.cy,
          style: {
            fill: !isUndefined(item.props.fill),
            border: !isUndefined(item.props.stroke),
            fillColor: <Color> item.props.fill,
            borderColor: <Color> item.props.stroke,
          },
        })
        this.add(circle)
        break
      case 'Rect':
        const rect = new Rect((<number> item.props.width) ?? 0, (<number> item.props.height) ?? 0, {
          x: item.props.x,
          y: item.props.y,
          style: {
            fill: !isUndefined(item.props.fill),
            border: !isUndefined(item.props.stroke),
          },
        })
        this.add(rect)
        break
      case 'Line':
        const line = new Line([item.props.x1, item.props.y1], [item.props.x2, item.props.y2], {
          style: {
            color: <Color> item.props.stroke,
          },
        })
        this.add(line)
        break
      case 'Path':
        const path = new Path()
        path.addPathFromSVGString(item.props.d)
        this.add(path)
        break
    }
    for (const child of item.children)
      this.processSVGItem(child)
  }
}
