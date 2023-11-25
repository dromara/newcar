import Markdown from "../../packages/mod-markdown/dist/newcar-mod-markdown.mjs";
import * as n from "../../packages/newcar/dist/newcar.mjs";

const car = n.createCar(document.querySelector("#test"));

const scene = n.createScene();

const f = new n.NumberPlane(100, 100, -100, -100, {
  gridColor: n.Color.White
});

const m = new Markdown("```javascript\nconsole.log()\n```");

const w = new n.WebView("<div>hello</div>");

const s = new n.Svg(
  '<circle cx="50" cy="50" r="50" style="stroke: red; fill: none"/>'
);

// scene.use(f);
scene.use(m);
scene.use(w);
scene.use(s);

scene.setUpdate((frame) => {
  switch (frame) {
    case 0: {
      f.animate(n.move, 100, {
        x: 100,
        y: 300
      });
    }
  }
});

car.checkout(scene);

car.play();
