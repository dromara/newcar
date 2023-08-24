/* eslint-disable @so1ve/prettier/prettier */
import { Car, animation, object, interpolator } from "./../packages/newcar/dist/newcar.js";

const car = new Car(document.querySelector("#mycanvas"), 60);

// const pen = new object.Pen({
//   lineWidth: 5,
//   color: "skyblue",
//   x: 0,
//   y: 100
// });
// const role_child = new object.Point({
//   x: 100,
//   y: 100,
// })
// const role = new object.Point({
//   children: [role_child],
//   x: 100,
//   y: 100
// })

const fn = new object.MathImage((x) => Math.sin(x) + 3, 0, 0, {
  lineWidth: 2,
  color: "greenyellow",
});

const system = new object.CoordinateSystem(0, 0, 0, 0, {
  x: 100,
  y: 400,
  arrow: false,
  grid_color: "skyblue",
  children: [fn],
  // x_color: "skyblue"
});

// const numberAxis = new object.NumberAxis(0, 0, {
//   x: 300,
//   y: 300,
//   arrow: false,
// })

car.addObject(system);

// car.addAnimationItem(new animation.Translation(role, {
//   startAt: 0,
//   lastsFor: 50,
//   to: [400, 100],
// }))

car.addAnimationItem(
  new animation.AxisLimit2d(system, {
    startAt: 0,
    lastsFor: 50,
    to: [500, 350, 0, 0],
  })
).addAnimationItem(new animation.Limit(fn, {
  startAt: 50,
  lastsFor: 100,
  to: [0, 9],
  by: interpolator.easeOutSine,
}));

// .addAnimationItem(new animation.AxisLimit(numberAxis, {
//   startAt: 0,
//   lastsFor: 400,
//   to: [100, -100],
// }))

// car.onUpdate(frame => {
//   if (frame === 1) {
//     pen.put()
//   }
//   pen.x = role.x;
//   pen.y = role.y
// })

car.play();
