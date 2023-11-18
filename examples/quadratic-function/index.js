import * as n from "../../packages/newcar/dist/newcar.mjs";

const car = n.createCar(document.querySelector("#scene"));
const scene = n.createScene();

const f = new n.MathFunction((x) => 1 / x, -7, 7, {});

const plane = new n.NumberPlane(350, 350, -350, -350, {
  x: 800,
  y: 450,
  gridColor: n.Color.BLUE,
});

scene.use(plane);
plane.addChildren(f);

car.checkout(scene);
car.play();
