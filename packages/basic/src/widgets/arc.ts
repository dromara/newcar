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
 * Represents an arc figure, a subclass of the Figure class.pnpm
 */
export class Arc extends Path {
  private rect: RRect
  radius: Ref<number>
  from: Ref<number>
  to: Ref<number>

  /**
   * Constructs a new Arc instance.
   * @param radius The radius of the arc.
   * @param from The starting angle of the arc in radians.
   * @param to The ending angle of the arc in radians.
   * @param options Optional configuration options for the arc.
   */
  constructor(
    radius: number,
    from: number,
    to: number,
    options?: FigureOptions,
  ) {
    super(options)
    this.radius = ref(radius)
    this.from = ref(from)
    this.to = ref(to)
  }

  /**
   * Initializes the arc figure.
   * @param ck The CanvasKit instance.
   */
  init(ck: CanvasKit): void {
    super.init(ck)

    this.rect = ck.LTRBRect(
      -this.radius.value,
      -this.radius.value,
      this.radius.value,
      this.radius.value,
    )

    this.path.addArc(this.rect, this.from.value, this.to.value * this.progress.value)

    changed(this.radius, (_) => {
      this.rect = ck.LTRBRect(
        -this.radius.value,
        -this.radius.value,
        this.radius.value,
        this.radius.value,
      )
      this.path.rewind()
      this.path.addArc(this.rect, this.from.value, this.to.value * this.progress.value)
    })
    changed(this.from, (_) => {
      this.path.rewind()
      this.path.addArc(this.rect, this.from.value, this.to.value * this.progress.value)
    })
    changed(this.to, (_) => {
      this.path.rewind()
      this.path.addArc(this.rect, this.from.value, this.to.value * this.progress.value)
    })
    changed(this.progress, (_) => {
      this.path.rewind()
      this.path.addArc(this.rect, this.from.value, this.to.value * this.progress.value)
    })
  }
}
