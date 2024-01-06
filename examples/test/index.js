/* eslint-disable no-console */
import * as $ from "../../packages/newcar/dist/newcar.mjs";

const s = $.sleep;

const scene = new $.Scene().add(
  new $.Arrow([0, 0], [200, 200]).setup(async (obj) => {
    await s(100);
    obj.animate($.create, 100);
  }),
);

const car = $.newcar("#test");
car.scene = scene;
car.play();

const recorder = new $.Recorder(car);
recorder.record(100, (url) => {
  console.log(url);
});
