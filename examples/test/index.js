/* eslint-disable no-console */
import * as $ from "../../packages/newcar/dist/newcar.mjs";

const car = $.newcar("#test", [
  new $.Arrow([100, 100], [50, 300]).animate($.move, 100, {
    toX: 200,
    toY: 100,
    fromX: 100,
    fromY: 100,
  }),
  new $.NumberPlane(-5, 5, -5, 5, {
    x: 300,
    y: 300,
  }),
]);

car.scene.update((elapsed) => {
});
car.play();

const recorder = new $.Recorder(car);
recorder.record(100, (url) => {
  console.log(url);
});
