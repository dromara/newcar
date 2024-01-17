/* eslint-disable no-console */
import * as $ from "../../packages/newcar/dist/newcar.mjs";

const car = $.newcar("#test", [
  new $.Arrow([100, 100], [50, 300])
    .animate($.move, 100, {
      toX: 200,
      toY: 100,
      fromX: 100,
      fromY: 100,
    })
    .add(
      new $.NumberPlane(-5, 5, -5, 5, {
        x: 300,
        y: 300,
      })
        .animate($.create, 100)
        .add(new $.MathFunction((x) => Math.sin(x), -5, 5)),
    ),
]);

car.play();

const recorder = new $.Recorder(car);
recorder.record(100, (url) => {
  console.log(url);
});
