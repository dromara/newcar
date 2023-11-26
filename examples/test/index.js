/* eslint-disable no-console */
import Markdown from "../../packages/mod-markdown/dist/newcar-mod-markdown.mjs";
import * as $ from "../../packages/newcar/dist/newcar.mjs";

const car = $.createCar("#test", [
  new Markdown(
    "# Hello world! \n```javascript\nconsole.log('hello, world!')\n```",
  ),
  new $.WebView("<div>hello</div>"),
  new $.WebView("<div>hello</div>", { x: 100 }),
  // new $.Brace([0, 0], [100, 100]),
  new $.Text("Hello world", {
    x: 200,
    y: 200,
  }),
]);

car.scene.setUpdate((frameCount) => {
  switch (frameCount) {
    case 100: {
      car.checkout(
        $.createScene([
          new $.Image("./image.webp", { x: 100, y: 100 }),
          new $.Svg(
            `<title>Cat</title>
<desc>Stick Figure of Cat</desc>
<!-- 在这里绘制图像 -->
<circle cx='70' cy='95' r='50' style='stroke:red; fill:none'></circle>`,
            { width: 100, height: 0 },
          ),
        ]),
      );
      break;
    }
  }
});
car.play();
