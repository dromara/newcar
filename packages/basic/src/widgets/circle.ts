import type { FigureOptions } from './figure'
import { Arc } from './arc'

export class Circle extends Arc {
  /**
   * Create a cirle
   * extend from Arc
   * @param radius
   * @param options
   */
  constructor(radius: number, options?: FigureOptions) {
    options ??= {}
    super(radius, 0, 360, options)
  }
}
