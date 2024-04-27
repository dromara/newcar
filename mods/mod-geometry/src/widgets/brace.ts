import type { Vector2 } from '@newcar/basic'
import type { WidgetOptions, WidgetStyle } from '@newcar/core'
import { Widget } from '@newcar/core'
import { Color } from '@newcar/utils'
import type { CanvasKit, Paint, Path } from 'canvaskit-wasm'

export interface BraceOptions extends WidgetOptions {
  style?: BraceStyle
}

export interface BraceStyle extends WidgetStyle {
  color?: Color
}

export class Brace extends Widget {
  declare style: BraceStyle
  path: Path
  paint: Paint
  parts: Widget

  constructor(
    public from: Vector2,
    public to: Vector2,
    options?: BraceOptions,
  ) {
    options ??= {}
    super(options)
    options.style ??= {}
    this.style.color = options.style.color ?? Color.WHITE
  }

  init(ck: CanvasKit): void {
    this.paint = new ck.Paint()
    this.paint.setStyle(ck.PaintStyle.Stroke)
    this.paint.setColor(this.style.color.toFloat4())
    this.paint.setAlphaf(this.style.transparency)
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    // eslint-disable-next-line no-empty
    if (propertyChanged === 'length') {
    }
  }
}
