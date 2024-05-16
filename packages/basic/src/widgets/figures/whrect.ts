import type { RectOptions } from './rect'
import { Rect } from './rect'

export class WHRect extends Rect {
  constructor(public width: number, public height: number, options: RectOptions) {
    super([-(width / 2), -(height / 2)], [width / 2, height / 2], options)
  }
}
