import Markdown from "../../packages/mod-markdown/dist/newcar-mod-markdown.mjs";
import * as $ from "../../packages/newcar/dist/newcar.mjs";

const car = $.newcar("#test", [
  new Markdown("```javascript\nconsole.log()\n```"),
  new $.WebView("<div>hello</div>"),
  new $.WebView("<div>hello</div>"),
  new $.Brace([0, 0], [100, 100], {
    x: 100,
    y: 100,
  }),
  new $.Text("Hello world", {
    x: 100,
    y: 100,
  }),
]);

car.scene.onUpdate((frameCount) => {
  switch (frameCount) {
    case 1000: {
      car.scene = $.scene([
        new $.Svg(
          '<circle cx="50" cy="50" r="50" style="stroke: red; fill: none"/>',
        ),
        new $.Image("./image.webp", {
          x: 100,
          y: 100,
        }),
      ]);
      break;
    }
  }
});

car.play();
