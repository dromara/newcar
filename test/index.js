import { createCar, createScene } from "../packages/newcar/dist/newcar.mjs";
import { MathFunction } from "../packages/basic/dist/newcar-basic-objects.mjs";

const car = createCar(document.querySelector("#test"));

const scene = createScene();

const f = new MathFunction(Math.sin, 0, 100);

scene.use(f);

car.checkout(scene);

car.play();
