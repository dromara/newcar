import { defineAnimation } from '@newcar/core'
import { Color } from '@newcar/utils'
import { Rect } from '../widgets'

export const showPassingFlashAround = defineAnimation({
  act(widget, elapsed, process, _duration, _ck, params) {
    process = params.by ? params.by(process) : process
    this.rect.style.offset = this.c * process
    if (process < 0.5)
      this.rect.style.interval = [100 * process * 2, this.c - 100 * process * 2]

    else
      this.rect.style.interval = [100 * (1 - process) * 2, this.c - 100 * (1 - process) * 2]
  },

  init(widget, _startAt, _duration, _ck, params: {
    color: Color
    width: number
  }) {
    this.rect = new Rect(widget.range[2] - widget.range[0] + 20, widget.range[3] - widget.range[1] + 20, {
      x: -10 - widget.range[0],
      y: -10 - widget.range[1],
      style: {
        fill: false,
        border: true,
        borderColor: params.color ?? Color.WHITE,
        borderWidth: params.width ?? 2,
      },
    })
    this.c = Math.abs(widget.range[2] - widget.range[0] + 10) * 2
    + Math.abs(widget.range[3] - widget.range[1] + 10) * 2
    widget.add(this.rect)
  },
})
