import type { CanvasKit, RRect } from 'canvaskit-wasm'
import type { Ref } from '@newcar/core'
import { changed, ref } from '@newcar/core'
import type { FigureOptions } from './figure'
import type { PathOptions, PathStyle } from './path.ts'
import { Path } from './path.ts'

export interface ArcOptions extends PathOptions {
  style?: ArcStyle
}

export interface ArcStyle extends PathStyle { }

/**
 * Represents an arc figure, a subclass of the Figure class.
 */
export class Arc extends Path {
  private rect: RRect
  radius: Ref<number>

  /**
   * Constructs a new Arc instance.
   * @param radius The radius of the arc.
   * @param from The starting angle of the arc in radians.
   * @param to The ending angle of the arc in radians.
   * @param options Optional configuration options for the arc.
   */
  constructor(
    radius: number,
    public from: number,
    public to: number,
    options?: FigureOptions,
  ) {
    super(options)
    this.radius = ref(radius)
  }

  /**
   * Initializes the arc figure.
   * @param ck The CanvasKit instance.
   */
  init(ck: CanvasKit): void {
    super.init(ck)

    this.path.arc(0, 0, this.radius.value, this.from, this.to)

    changed(this.radius, (radius) => {
      this.path.rewind()
      this.path.arc(0, 0, radius.value, this.from, this.to)
    })
  }
}
