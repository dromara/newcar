/* eslint-disable no-console */
import * as $ from "../../packages/newcar/dist/newcar.mjs";

const car = $.newcar("#scene", [
  new $.NumberAxis(5, 10, {
    x: 800,
    y: 400,
    trend: { font: "italic", x: -2, y: 30, size: 30 },
  }).animate($.move, 3, { toX: 20, toY: 400 }),
  new $.Arc(1, { x: 100, y: 100 }).animate($.radius, 1, {
    from: 1,
    to: 100,
    by: $.easeInQuart,
  }),
  new $.NumberPlane(5, -10, -4, 9, {
    x: 1200,
    y: 600,
    axisX: { rotation: 0.1 },
    axisY: { rotation: -2 },
  }).animate($.zoomIn, 300, { by: $.easeBounce }),
  new $.Line([0, 0], [200, 200]).animate($.create, 100, {})
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

(async () => {
  console.log("Hello");
  await $.sleep(30);
  console.log("World!");
})()

car.play();

const recorder = new $.Recorder(car);
recorder.record(3, (url) => {
  console.log(url);
});
