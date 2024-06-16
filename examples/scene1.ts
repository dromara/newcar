import * as nc from 'newcar'
import * as mt from '@newcar/mod-math'
import * as gm from '@newcar/mod-geometry'

// await nc.useFont('../Roboto-Regular.ttf')

// // remove ck from AnimationContext

// const show = () => nc.depend<() => boolean, nc.AnimationContext<nc.Widget>>(ctx => () => {
//   ctx.widget.show()
//   return true
// })

// const withFunction = <T extends nc.Widget>(f: (widget: T) => boolean) => {
//   return nc.depend<() => boolean, nc.AnimationContext<nc.T>>(ctx => () => {
//     return f(ctx.widget)
//   })
// }

// const withInitial = <T extends nc.Widget>(f: (widget: T, anim: Anim<T>) => boolean) => { }

// export default nc.createScene(
//   new nc.Widget()
//     .add(new nc.Widget()
//       .add(new nc.Widget()
//         .add(
//           new nc.Text("What is Newcar?", {
//             style: {
//               fontSize: 50
//             },
//             width: 1600,
//             textAlign: 'center',
//             y: 450
//           })
//             .animate(nc.stroke().withAttr({ duration: 3 }))
//             .animate(nc.move().withAttr({ duration: 1, to: [0, 150], by: nc.easeOutCubic }))
//             .animate(nc.fadeOut().withAttr({ duration: 0.7 }))
//             .animate(nc.delay(0.6))
//             .animate(withFunction<nc.Text>((w) => {
//               w.text.value = 'This is a circle, you can see it gradually grows.'
//               w.style.transparency.value = 1
//               w.style.interval.value = [0, 0]
//               return true
//             }))
//             .animate(nc.stroke().withAttr({ duration: 3 }))
//             .animate(nc.delay(4))
//             .animate(withFunction<nc.Text>((w) => {
//               w.text.value = 'And it is falling down with bounce'
//               w.style.transparency.value = 1
//               w.style.interval.value = [0, 0]
//               return true
//             }))
//             .animate(nc.stroke().withAttr({ duration: 3 }))
//             .animate(nc.delay(1))
//             .animate(nc.fadeOut().withAttr({ duration: 1 }))

//         )
//         .add(new nc.Arc(Math.PI * 50, 0, 360, {
//           x: 800,
//           y: 450,
//         })
//           .add(
//             new mt.MathFunction(x => Math.PI * Math.sin(x / Math.PI), [-4 * Math.PI, 0], {
//               style: {
//                 scaleY: -1
//               },
//               x: Math.PI * 50
//             }).kill()
//               .animate(nc.delay(16))
//               .animate(withFunction(w => {
//                 w.resurrect()
//                 return true
//               }))
//               .animate(

//                 nc.move().withAttr({ duration: 6, to: [5 * Math.PI * 50, 0] })
//               )
//           )
//           .animate(withFunction(w => {
//             w.progress.value = 0
//             return true
//           }))
//           .animate(nc.delay(7.5))
//           .animate(nc.create().withAttr({ duration: 1 }))
//           .animate(nc.delay(3.5))
//           .animate(nc.move().withAttr({ duration: 2, to: [800, 1200], by: nc.easeBounce }))
//           .animate(nc.delay(1))
//           .animate(nc.parallel(
//             nc.scale().withAttr({ to: [2, 2], duration: 1 }),
//             nc.move().withAttr({ to: [1600, 900], duration: 1, by: nc.easeInOutCubic }),
//           ))
//           .animate(withFunction<nc.Arc>(w => {
//             w.style.fill.value = false
//             w.style.border.value = true
//             return true
//           }))
//           .add(
//             new mt.NumberPlane([-1000, 1000], [-1000, 1000], {
//               style: {
//                 textsX: false,
//                 textsY: false
//               }
//             }).kill()
//               .animate(nc.delay(16))
//               .animate(withFunction(w => {
//                 w.resurrect()
//                 return true
//               }))
//               .animate(nc.create().withAttr({ duration: 1, by: nc.easeOutExpo }))
//           )
//           .add(...(() => {
//             const main = new nc.Line([0, 0], [Math.PI * 50, 0], {
//               style: {
//                 width: 3
//               }
//             }).kill()
//               .animate(nc.delay(16))
//               .animate(withFunction(w => {
//                 w.resurrect()
//                 return true
//               }))
//               .animate(nc.rotate().withAttr({ duration: 6, to: 720 }))
//             return [main]
//           })()))

//       )

//       .add(new nc.Rect(500, 500, {
//         style: {
//           fillColor: nc.Color.parse('skyblue'),
//           blendMode: 'srcIn',
//           rotation: 45,
//         },
//         x: 600,
//         y: 250,
//       }).hide()
//         .animate(nc.delay(9))
//         .animate(withFunction(w => {
//           w.show()
//           return true
//         }))
//         .animate(nc.create().withAttr({ duration: 1 })))
//       .animate(nc.delay(11))
//       .animate(nc.scale().withAttr({ duration: 1, to: [0.5, 0.5] }))
//     )
//     .add(
//       new nc.Line([0, 700], [1600, 700]).kill()
//         .animate(nc.delay(11))
//         .animate(withFunction((w) => {
//           w.resurrect()
//           return true
//         }))
//         .animate(
//           nc.create().withAttr({ duration: 1 })
//         )
//     )
// )

await nc.useFont('./Roboto-Regular.ttf')

export default nc.createScene(
  new gm.Angle(0, 80, {
    x: 100,
    y: 100
  })
  .animate(
    nc.changeProperty<gm.Angle>(w => w.to).withAttr({ duration: 1, to: 30 })
  )
)