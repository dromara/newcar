import { Canvas, CanvasKit } from 'canvaskit-wasm'
import { Vector2 } from '../../utils/vector2'
import { FigureOptions, FigureStyle, Figure } from './figure'
import { Polygon } from './polygon'
import { Line } from './line'

export interface ArrowOptions extends FigureOptions {
  style?: ArrowStyle
}

export interface ArrowStyle extends FigureStyle {}

export class Arrow extends Figure {
  private tip: Polygon
  private trim: Line
  radian: number

  constructor(
    public from: Vector2,
    public to: Vector2,
    options?: ArrowOptions,
  ) {
    options ??= {}
    super(options)
  }

  init(ck: CanvasKit): void {
    this.radian =
      (Math.atan(
        Math.abs(this.from[1] - this.to[1]) /
          Math.abs(this.from[0] - this.to[0]),
      ) /
        (2 * Math.PI)) *
      360
    this.tip = new Polygon(
      [
        [0, 10],
        [22, 0],
        [0, -10],
      ],
      {
        x: this.to[0],
        y: this.to[1],
        style: ((style: FigureStyle) => {
          style.rotation = this.radian
          style.scaleX = this.from[0] > this.to[0] ? -1 : 1
          style.scaleY = this.from[1] > this.to[1] ? -1 : 1
          return style
        })(this.style),
        progress: this.progress,
      },
    )
    this.trim = new Line(this.from, this.to, {
      style: {
        color: this.style.borderColor,
        width: this.style.borderWidth,
      },
      progress: this.progress
    })
    console.log(this.trim)
    this.children.push(this.trim, this.tip)
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    switch (propertyChanged) {
      case 'from' || 'to': {
        this.radian =
          (Math.atan(
            Math.abs(this.from[1] - this.to[1]) /
              Math.abs(this.from[0] - this.to[0]),
          ) /
            (2 * Math.PI)) *
          360
        this.tip.style.rotation = this.radian
        this.trim.from = this.from
        this.trim.to = this.to
        break
      }
      case 'progress': {
        this.tip.progress = this.progress
        this.trim.progress = this.progress
      }
    }
  }
}
