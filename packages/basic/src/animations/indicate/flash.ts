import { Widget, withHook } from '@newcar/core'
import { Line } from '../../widgets'

export function flash() {
  const center = new Widget()
  return withHook<Widget, {
    length: number
  }>({
    animate({ process, length }) {
      length ??= 25
      center.resurrect()
      for (const child of center.children) {
        if (process < 0.5) {
          (child as Line).style.interval.value = [length * process * 2, length - length * process * 2]
        }
        else if (process > 0.5) {
          (child as Line).style.interval.value = [length * (1 - process) * 2, length - length * (1 - process) * 2]
        }
      }
    },
    before({ widget, length }) {
      length ??= 25
      for (let r = 0; r <= 360; r += 10) {
        center.add(
          new Line([Math.sqrt(((widget.singleRange[2] - widget.singleRange[0]) / 2) ** 2
            + ((widget.singleRange[3] - widget.singleRange[1]) / 2) ** 2) + 5, 0], [Math.sqrt(((widget.singleRange[2] - widget.singleRange[0]) / 2) ** 2
            + ((widget.singleRange[3] - widget.singleRange[1]) / 2) ** 2) + length, 0], {
            style: {
              rotation: r,
            },
            x: (widget.singleRange[2] - widget.singleRange[0]) / 2,
            y: (widget.singleRange[3] - widget.singleRange[1]) / 2,
          }),
        )
      }
      center.kill()
      widget.add(center)
    },
    after() {
      center.remove()
    },
  })
}
