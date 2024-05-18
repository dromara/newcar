import type { Canvas, CanvasKit, RRect, Path as ckPath } from 'canvaskit-wasm'
import { str2BlendMode } from '@newcar/utils'
import type { WidgetRange } from '@newcar/core'
import { $ck } from '@newcar/core'
import type { FigureOptions } from './figure'
import { Figure } from './figure'

/**
 * Represents an arc figure, a subclass of the Figure class.
 */
export class Arc extends Figure {
  private rect: RRect
  path: ckPath = new $ck.Path()

  /**
   * Constructs a new Arc instance.
   * @param radius The radius of the arc.
   * @param from The starting angle of the arc in radians.
   * @param to The ending angle of the arc in radians.
   * @param options Optional configuration options for the arc.
   */
  constructor(
    public radius: number,
    public from: number,
    public to: number,
    options?: FigureOptions,
  ) {
    super(options)
  }

  /**
   * Initializes the arc figure.
   * @param ck The CanvasKit instance.
   */
  init(ck: CanvasKit): void {
    // Stroke
    this.strokePaint = new ck.Paint()
    this.strokePaint.setStyle(ck.PaintStyle.Stroke)
    this.strokePaint.setShader(this.style.borderShader?.toCanvasKitShader(ck) ?? null)
    this.strokePaint.setColor(this.style.borderColor.toFloat4())
    this.strokePaint.setStrokeWidth(this.style.borderWidth)
    this.strokePaint.setAlphaf(this.style.transparency * this.style.borderColor.alpha)
    this.strokePaint.setAntiAlias(this.style.antiAlias)
    try {
      const dash = ck.PathEffect.MakeDash(
        this.style.interval,
        this.style.offset,
      )
      this.strokePaint.setPathEffect(dash)
    }
    catch {}

    // Fill
    this.fillPaint = new ck.Paint()
    this.fillPaint.setShader(this.style.fillShader?.toCanvasKitShader(ck) ?? null)
    this.fillPaint.setColor(this.style.fillColor.toFloat4())
    this.fillPaint.setStyle(ck.PaintStyle.Fill)
    this.fillPaint.setAlphaf(this.style.transparency * this.style.fillColor.alpha)
    this.fillPaint.setAntiAlias(this.style.antiAlias)

    // Blend Mode
    this.strokePaint.setBlendMode(str2BlendMode(ck, this.style.blendMode))
    this.fillPaint.setBlendMode(str2BlendMode(ck, this.style.blendMode))

    this.rect = ck.LTRBRect(
      -this.radius,
      -this.radius,
      this.radius,
      this.radius,
    )

    this.path.addArc(this.rect, this.from, this.to)
  }

  /**
   * Updates the arc figure based on property changes.
   * @param ck The CanvasKit instance.
   * @param propertyChanged The name of the property that changed.
   */
  predraw(ck: CanvasKit, propertyChanged?: string): void {
    switch (propertyChanged) {
      case 'radius': {
        this.rect.set([-this.radius, -this.radius, this.radius, this.radius])
        break
      }
      case 'style.borderColor': {
        this.strokePaint.setColor(this.style.borderColor.toFloat4())
        break
      }
      case 'style.borderShader': {
        this.strokePaint.setShader(this.style.borderShader?.toCanvasKitShader(ck) ?? null)
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
      case 'style.fillShader': {
        this.fillPaint.setShader(this.style.fillShader?.toCanvasKitShader(ck) ?? null)
        break
      }
      case 'style.offset':
      case 'style.interval': {
        this.strokePaint.setPathEffect(
          ck.PathEffect.MakeDash(this.style.interval, this.style.offset),
        )
        break
      }
      case 'style.blendMode': {
        // Blend Mode
        this.strokePaint.setBlendMode(str2BlendMode(ck, this.style.blendMode))
        this.fillPaint.setBlendMode(str2BlendMode(ck, this.style.blendMode))
        break
      }
    }
    this.strokePaint.setAlphaf(this.style.transparency * this.style.borderColor.alpha)
    this.fillPaint.setAlphaf(this.style.transparency * this.style.fillColor.alpha)
  }

  /**
   * Draws the arc figure on the canvas.
   * @param canvas The canvas to draw on.
   */
  draw(canvas: Canvas): void {
    this.path.rewind()
    this.path.addArc(this.rect, this.from, this.to * this.progress)
    if (this.style.border)
      canvas.drawPath(this.path, this.strokePaint)

    if (this.style.fill)
      canvas.drawPath(this.path, this.fillPaint)
  }

  calculateIn(x: number, y: number): boolean {
    return this.path.contains(x, y)
  }

  calculateRange(): WidgetRange {
    const bounds = this.path.computeTightBounds()
    return [...bounds] as WidgetRange
  }
}
