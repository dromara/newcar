import { defineAnimation } from '@newcar/core'
import { Color } from '@newcar/utils'
import { Rect } from '../widgets'

/**
 * Show a line which pass around the widget.
 */
export const showPassingFlashAround = defineAnimation({
  act(_widget, _elapsed, process, _duration, _ck, params) {
    process = params.by ? params.by(process) : process
    this.rect.style.offset = this.c * process
    if (process < 0.5)
      this.rect.style.interval = [100 * process * 2, this.c - 100 * process * 2]
    else if (process > 0.5)
      this.rect.style.interval = [100 * (1 - process) * 2, this.c - 100 * (1 - process) * 2]
  },

  init(widget, _startAt, _duration, _ck, params: {
    color: Color
    width: number
  }) {
    this.rect = new Rect(widget.singleRange[2] - widget.singleRange[0] + 20, widget.singleRange[3] - widget.singleRange[1] + 20, {
      x: -10 - widget.singleRange[0],
      y: -10 - widget.singleRange[1],
      style: {
        fill: false,
        border: true,
        borderColor: params.color ?? Color.WHITE,
        borderWidth: params.width ?? 2,
      },
    })
    this.c = Math.abs(widget.singleRange[2] - widget.singleRange[0] + 10) * 2
    + Math.abs(widget.singleRange[3] - widget.singleRange[1] + 10) * 2
    widget.add(this.rect)
  },

  after(_widget, _elapsed, _ck, _params) {
    this.rect.kill()
  },
})
