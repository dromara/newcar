import * as n from "../../packages/newcar/dist/newcar.mjs";

const car = n.createCar(document.querySelector("#test"));

const scene = n.createScene();

const f = new n.NumberPlane(100, 100, -100, -100, {
  gridColor: n.Color.RED,
});

scene.use(f);

scene.setUpdate((frame) => {
  switch (frame) {
    case 0: {
      f.animate(n.move, 100, {
        x: 100,
        y: 300,
      });
    }
  }
});

car.checkout(scene);

car.play();
