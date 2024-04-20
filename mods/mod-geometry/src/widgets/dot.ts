import { Circle } from '@newcar/basic'
import type { FigureOptions } from '@newcar/basic'

export class Dot extends Circle {
  constructor(options?: FigureOptions) {
    options ??= {}
    super(5, options)
  }
}
