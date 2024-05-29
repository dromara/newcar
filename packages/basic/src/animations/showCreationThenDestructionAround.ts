import { defineAnimation } from '@newcar/core'
import { Color } from '@newcar/utils'
import type { Figure } from '../widgets/figures/figure'
import { Rect } from '../widgets'

/**
 * Create a rectangle that grows and shrinks around the center of the widget
 * and then destroys itself.
 */
export const showCreationThenDestructionAround = defineAnimation<Figure>({
  act(_widget, _elapsed, process, _duration, _ck, _params) {
    this.rect.show()
    if (process < 0.5) {
      this.rect.style.interval = [this.c * process * 2, this.c - this.c * process * 2]
    }
    else if (process > 0.5) {
      this.rect.style.interval = [this.c * (1 - process) * 2, this.c - this.c * (1 - process) * 2]
    }
  },

  init(widget, _startAt, _duration, _ck, params: {
    color: Color
    width: number
  }) {
    this.rect = new Rect(Math.abs(widget.singleRange[2] - widget.singleRange[0]) + 20, Math.abs(widget.singleRange[3] - widget.singleRange[1]) + 20, {
      x: -10,
      y: -10,
      style: {
        fill: false,
        border: true,
        borderColor: params.color ?? Color.WHITE,
        borderWidth: params.width ?? 2,
      },
    })
    this.c = Math.abs(widget.singleRange[2] - widget.singleRange[0] + 10) * 2
    + Math.abs(widget.singleRange[3] - widget.singleRange[1] + 10) * 2
    this.rect.hide()
    widget.add(this.rect)
  },

  after(_widget, _elapsed, _ck, _params) {
    this.rect.kill()
  },
})
