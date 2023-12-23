/* eslint-disable no-console */
import * as $ from "../../packages/newcar/dist/newcar.mjs";

const car = $.newcar("#test", [new $.Arrow([100, 100], [50, 300])]);

car.scene.update((elapsed) => {
  console.log(elapsed);
  if (elapsed === 100) {
    // in frames
    $.config.timing = "second";
  }
});
car.play();

const recorder = new $.Recorder(car);
recorder.record(4, (url) => {
  console.log(url);
});
