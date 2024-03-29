import { $sourcesLoaded } from '@newcar/core'
import type { Canvas, CanvasKit, Font, Typeface } from 'canvaskit-wasm'
import { Figure, FigureOptions, FigureStyle } from './figures/figure'

export interface TextOptions extends FigureOptions {
  style?: TextStyle
}

export interface TextStyle extends FigureStyle {
  size?: number
}

export class Text extends Figure {
  private font: Font
  private typeface: Typeface
  declare style: TextStyle

  constructor(
    public text: string,
    public fontname: string,
    options?: TextOptions,
  ) {
    options ??= {}
    super(options)
    this.style ??= {}
    this.style.size = options.style.size ?? 100
  }

  init(ck: CanvasKit): void {
    // Stroke
    this.strokePaint = new ck.Paint()
    this.strokePaint.setStyle(ck.PaintStyle.Stroke)
    this.strokePaint.setColor(this.style.borderColor.toFloat4())
    this.strokePaint.setStrokeWidth(this.style.borderWidth)

    // Fill
    this.fillPaint = new ck.Paint()
    this.fillPaint.setColor(this.style.fillColor.toFloat4())
    this.fillPaint.setStyle(ck.PaintStyle.Fill)

    // Font
    this.typeface = ck.Typeface.MakeFreeTypeFaceFromData(
      $sourcesLoaded[this.fontname],
    )
    this.font = new ck.Font(this.typeface, this.style.size)
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    switch (propertyChanged) {
      case 'fontname': {
        this.typeface = ck.Typeface.MakeFreeTypeFaceFromData(
          $sourcesLoaded[this.fontname],
        )
        this.font.setTypeface(this.typeface)
        break
      }
      case 'style.size': {
        this.font.setSize(this.style.size)
        break
      }
      case 'style.borderColor': {
        this.strokePaint.setColor(this.style.borderColor.toFloat4())
        break
      }
      case 'style.borderWidth': {
        this.strokePaint.setStrokeWidth(this.style.borderWidth)
        break
      }
      case 'style.fillColor': {
        this.fillPaint.setColor(this.style.fillColor.toFloat4())
        break
      }
    }
  }

  draw(canvas: Canvas): void {
    if (this.style.fill) {
      canvas.drawText(this.text, this.x, this.y, this.fillPaint, this.font)
    }
    if (this.style.border) {
      canvas.drawText(this.text, this.x, this.y, this.strokePaint, this.font)
    }
  }
}
