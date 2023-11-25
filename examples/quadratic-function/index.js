import * as $ from "../../packages/newcar/dist/newcar.mjs";

const car = $.createCar(document.querySelector("#scene"));
const scene = $.createScene();

const f = new $.MathFunction((x) => 1 / x, -7, 7, {});

const plane = new $.NumberPlane(350, 350, -350, -350, {
  x: 800,
  y: 450,
  gridColor: $.Color.BLUE
});

scene.use(plane);
plane.addChildren(f);

car.checkout(scene);
car.play();
