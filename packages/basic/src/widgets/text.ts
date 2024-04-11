import { AsyncWidget, AsyncWidgetResponse } from '@newcar/core'
import type { Canvas, CanvasKit, Font, Paint, ParagraphStyle, TextAlign, TextBaseline, Typeface } from 'canvaskit-wasm'
import { Figure, FigureOptions, FigureStyle } from './figures/figure'
import { Color } from '@newcar/utils'

export interface TextOptions extends FigureOptions {
  style?: TextStyle
}

export interface TextStyle extends FigureStyle {
  size?: number
  align?: TextAlign
  baseline?: TextBaseline
}

export class Text extends AsyncWidget {
   font: Font
  typeface: Typeface
  declare style: TextStyle
  strokePaint: Paint
  fillPaint: Paint

  constructor(
    public text: string,
    public fontpath: string,
    options?: TextOptions,
  ) {
    options ??= {}
    super(options)
    options.style ??= {}
    this.style.size = options.style.size ?? 100
    this.style.borderColor = options.style.borderColor ?? Color.WHITE
    this.style.borderWidth = options.style.borderWidth ?? 2
    this.style.fillColor = options.style.fillColor ?? Color.WHITE
    this.style.fill = options.style.fill ?? true
    this.style.border = options.style.border ?? false
  }

  async init(ck: CanvasKit): Promise<AsyncWidgetResponse> {
    // Stroke
    this.strokePaint = new ck.Paint()
    this.strokePaint.setStyle(ck.PaintStyle.Stroke)
    this.strokePaint.setColor(this.style.borderColor.toFloat4())
    this.strokePaint.setStrokeWidth(this.style.borderWidth)
    this.strokePaint.setAlphaf(this.style.transparency)
    try {
      const dash = ck.PathEffect.MakeDash(
        this.style.interval,
        this.style.offset,
      )
      this.strokePaint.setPathEffect(dash)
    } catch {}
    // Fill
    this.fillPaint = new ck.Paint()
    this.fillPaint.setColor(this.style.fillColor.toFloat4())
    this.fillPaint.setStyle(ck.PaintStyle.Fill)
    this.fillPaint.setAlphaf(this.style.transparency)

    // Font
    try {
      const res = await fetch(this.fontpath)
      const fontData = await res.arrayBuffer()
      this.typeface = ck.Typeface.MakeFreeTypeFaceFromData(fontData)
      this.font = new ck.Font(this.typeface, this.style.size)
      return {
        status: 'ok',
      }
    } catch (error) {
      return {
        status: 'error',
      }
    }
  }

  async predraw(
    ck: CanvasKit,
    propertyChanged: string,
  ): Promise<AsyncWidgetResponse> {
    switch (propertyChanged) {
      case 'fontname': {
        const res = await fetch(this.fontpath)
        const fontData = await res.arrayBuffer()
        this.typeface = ck.Typeface.MakeFreeTypeFaceFromData(fontData)
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
      case 'style.offset':
      case 'style.interval': {
        this.strokePaint.setPathEffect(
          ck.PathEffect.MakeDash(this.style.interval, this.style.offset),
        )
        console.log("hello!");
        
      }
    }
    this.strokePaint.setAlphaf(this.style.transparency)
    this.fillPaint.setAlphaf(this.style.transparency)
    return {
      status: 'ok',
    }
  }

  draw(canvas: Canvas): void {
    if (this.style.fill) {
      canvas.drawText(
        this.text.slice(0, Math.round(this.progress * this.text.length)),
        0,
        0,
        this.fillPaint,
        this.font,
      )
    }
    if (this.style.border) {
      canvas.drawText(
        this.text.slice(0, Math.round(this.progress * this.text.length)),
        0,
        0,
        this.strokePaint,
        this.font,
      )
    }
  }
}
