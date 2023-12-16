/* eslint-disable no-console */
import * as $ from "../../packages/newcar/dist/newcar.mjs";

const car = $.newcar("#scene", [
  new $.NumberAxis(10, -10, {
    color: $.Color.CYAN,
    tick: 2,
    x: 800,
    y: 600,
    arrow: null,
    trend: { y: 16, size: 16 },
  }).animate($.zoomIn, 3, { by: $.easeBounce }),
  new $.NumberAxis(5, 10, {
    x: 800,
    y: 400,
    trend: { font: "italic", x: -2, y: 30, size: 30 },
  }).animate($.move, 3, { toX: 20, toY: 400 }),
  new $.NumberAxis(-10, -5, {
    x: 800,
    y: 200,
    interval: 0.5,
    unit: 150,
    rotation: 0.2,
  }),
  new $.Arc(1, {
    x: 100,
    y: 100,
  }).animate($.radius, 1, {
    from: 1,
    to: 100,
    by: $.easeInQuart,
  }),
  // new $.NumberPlane(-10, -5, {
  //   x: 800,
  //   y: 200,
  //   interval: 0.5,
  //   unit: 150,
  //   rotation: 0.2,
  // }),
  // new $.MathFunction(Math.sin, -1, 100, {
  //   x: 100,
  //   y: 100,
  // }),
]);

car.scene.update((elapsed) => {
  if (elapsed < 3) {
    console.log("elapsed:", Number(String(elapsed).slice(0, 4)));
  }
});

car.play();

const recorder = new $.Recorder(car);
recorder.record(3, (url) => {
  console.log(url);
});
