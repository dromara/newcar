/* eslint-disable no-console */
import * as $ from "../../packages/newcar/dist/newcar.mjs";

const plane = new $.NumberPlane(10, -16, -8, 9, {
  x: 800,
  y: 450,
  unit: 40,
  trend: {
    color: $.Color.CYAN,
    // x: 16,
    // y: 16,
  },
  axisX: {
    rotation: 0.2,
  },
  axisY: {
    rotation: -2,
  },
});
const dot = new $.Arc(10, {
  fillColor: $.Color.RED,
  x: plane.x,
  y: plane.y,
});
const axis = new $.NumberAxis(-60, 30, {
  x: 200,
  y: 200,
  // rotation: 0.2,
});

// new $.MathFunction(Math.sin, -1, 100, {
//   x: 100,
//   y: 100,
// }),
const car = $.newcar("#scene", [
  // new $.NumberPlane(-16, 16, -9, 9, { x: 800, y: 450 }),
]);
car.scene.add(plane, dot, axis);

// car.scene.update((elapsed) => {
//   if (elapsed < 3) {
//     console.log("elapsed:", Number(String(elapsed).slice(0, 4)));
//   }
// });

car.play();

const recorder = new $.Recorder(car);
recorder.record(3, (url) => {
  console.log(url);
});
