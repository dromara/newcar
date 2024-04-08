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
        style: {
          scaleX: this.from[0] > this.to[0] ? -1 : 1,
          scaleY: this.from[1] > this.to[1] ? -1 : 1,
          rotation: this.radian,
          ...this.style
        },
        progress: this.progress,
      },
    )
    this.trim = new Line(this.from, this.to, {
      style: {
        color: this.style.borderColor,
        width: this.style.borderWidth,
        ...this.style
      },
      progress: this.progress,
    })
    this.add(this.trim, this.tip)
    // WARN: Must push parts in constructor, if not, it will err
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    switch (propertyChanged) {
      case 'from':
      case 'to': {
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
        break
      }
      case 'style.transparency': {
        this.tip.style.transparency = this.style.transparency
        this.trim.style.transparency = this.style.transparency
      }
    }
  }
}
