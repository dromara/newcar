import * as $ from "../../packages/newcar/dist/newcar.mjs";

const car = $.newcar("#scene");

const f = new $.MathFunction((x) => 1 / x, -7, 7, {});

const plane = new $.NumberPlane(350, 350, -350, -350, {
  x: 800,
  y: 450,
  gridColor: $.Color.BLUE,
});

car.scene.add(plane.add(f));

car.play();
