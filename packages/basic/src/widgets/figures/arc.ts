import type { Canvas, CanvasKit, RRect } from 'canvaskit-wasm'
import type { FigureOptions } from './figure'
import type { PathOptions, PathStyle } from './path.ts'
import { Path } from './path.ts'

export interface ArcOptions extends PathOptions {
  style?: ArcStyle
}

export interface ArcStyle extends PathStyle {}

/**
 * Represents an arc figure, a subclass of the Figure class.
 */
export class Arc extends Path {
  private rect: RRect

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
    super.init(ck)

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
    super.predraw(ck, propertyChanged)
    switch (propertyChanged) {
      case 'radius': {
        this.rect.set([-this.radius, -this.radius, this.radius, this.radius])
        break
      }
    }
  }

  /**
   * Draws the arc figure on the canvas.
   * @param canvas The canvas to draw on.
   */
  draw(canvas: Canvas): void {
    this.path.rewind()
    this.path.addArc(this.rect, this.from, this.to * this.progress)

    super.draw(canvas)
  }
}
