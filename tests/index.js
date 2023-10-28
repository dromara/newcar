import { createCar, createScene } from "../packages/newcar/dist/newcar.js";

const car = createCar(document.querySelector("#test"));

const scene = createScene();

car.checkout(scene);

car.play();
