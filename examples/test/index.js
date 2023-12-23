/* eslint-disable no-console */
import * as $ from "../../packages/newcar/dist/newcar.mjs";

const car = $.newcar("#test", [
  new $.Arrow([100, 100], [50, 300]).animate($.move, 100, {
    toX: 200,
    toY: 100,
    fromX: 100,
    fromY: 100,
  }),
]);

car.scene.update((elapsed) => {
  console.log(elapsed);
  if (elapsed === 1) {
    car.play(300);
  }
});
car.play();

const recorder = new $.Recorder(car);
recorder.record(4, (url) => {
  console.log(url);
});
