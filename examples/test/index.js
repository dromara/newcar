import Markdown from "../../packages/mod-markdown/dist/newcar-mod-markdown.mjs";
import * as n from "../../packages/newcar/dist/newcar.mjs";

const car = n.createCar(document.querySelector("#test"));

const scene = n.createScene();
const scene2 = n.createScene();

const f = new n.NumberPlane(100, 100, -100, -100, {
  gridColor: n.Color.White,
});

const m = new Markdown("```javascript\nconsole.log()\n```");

const w1 = new n.WebView("<div>hello</div>");
const w2 = new n.WebView("<div>hello</div>");

const s = new n.Svg('<circle cx="50" cy="50" r="50" style="stroke: red; fill: none"/>');

const i = new n.Image("./image.webp", {
  x: 100,
  y: 100,
});

// scene.use(f);
scene.use(m);
scene.use(w1);
scene.use(w2);
scene2.use(s);
scene2.use(i);

scene2.setUpdate((frame) => {
  if (frame === 100) {
    car.checkout(scene);
  }
});

car.checkout(scene2);
// setTimeout(() => {
//   car.checkout(scene2);
// }, 1000);
// car.checkout(scene);

car.play();
