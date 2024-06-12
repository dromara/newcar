// import { withHook } from '@newcar/core'
// import { Color } from '@newcar/utils'
// import type { Widget } from '@newcar/core'
// import { Rect } from '../../widgets'

// /**
//  * Show a line which pass around the widget.
//  */
// export function showPassingFlashAround() {
//   let rect: Rect
//   let c: number
//   return withHook<Widget, {}>({
//     animate({ by, process }) {
//       rect.show()
//       process = by ? by(process) : process
//       rect.style.offset.value = c * process
//       if (process < 0.5)
//         rect.style.interval = [100 * process * 2, this.c - 100 * process * 2]
//       else if (process > 0.5)
//         this.rect.style.interval = [100 * (1 - process) * 2, this.c - 100 * (1 - process) * 2]
//     },

//     init(widget, _startAt, _duration, _ck, params: {
//       color: Color
//       width: number
//     }) {
//       this.rect = new Rect(widget.singleRange[2] - widget.singleRange[0] + 20, widget.singleRange[3] - widget.singleRange[1] + 20, {
//         x: -10,
//         y: -10,
//         style: {
//           fill: false,
//           border: true,
//           borderColor: params.color ?? Color.WHITE,
//           borderWidth: params.width ?? 2,
//         },
//       })
//       this.c = Math.abs(widget.singleRange[2] - widget.singleRange[0] + 10) * 2
//       + Math.abs(widget.singleRange[3] - widget.singleRange[1] + 10) * 2
//       widget.add(this.rect)
//       this.rect.hide()
//     },

//     after(_widget, _elapsed, _ck, _params) {
//       this.rect.kill()
//     },
//   })
// }
