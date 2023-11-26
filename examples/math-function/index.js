/* eslint-disable no-console */
import * as $ from "../../packages/newcar/dist/newcar.mjs";

const car = $.createCar("#scene", [
  new $.NumberAxis(-200, 200, {
    x: 800,
    y: 600,
  }),
]);

car.scene.setUpdate((elapsed) => {
  console.log(elapsed);
});

car.play();
