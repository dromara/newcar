import Markdown from "../../packages/mod-markdown/dist/newcar-mod-markdown.mjs";
import * as n from "../../packages/newcar/dist/newcar.mjs";

const car = n.createCar(document.querySelector("#test"));

const scene = n.createScene();

const f = new n.NumberPlane(100, 100, -100, -100, {
  gridColor: n.Color.White,
});

const m = new Markdown("<span style='color: white'>Hello world!</span>", {
  x: 100,
  y: 100,
});

const w = new n.WebView("hello", {
  x: 100,
  y: 100,
});

console.log(m)

// scene.use(f);
// scene.use(m);
scene.use(w);

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
