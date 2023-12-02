import Markdown from "../../packages/mod-markdown/dist/newcar-mod-markdown.mjs";
import { CodeBlock } from "../../packages/mod-codeblock/dist/newcar-mod-codeblock.mjs"
import * as $ from "../../packages/newcar/dist/newcar.mjs";

const car = $.newcar("#test", [
  new Markdown(
    "# Hello world! \n```javascript\nconsole.log('hello, world!')\n```",
  ),
  new $.WebView("<h2>hello</h2>"),
  new $.WebView("<div>hello</div>", { x: 100 }),
  // new $.Brace([0, 0], [100, 100]),
  new $.Text("Hello world", {
    x: 200,
    y: 200,
  }),
]);

car.scene.update((elapsed) => {
  if (elapsed > 3) {
    car.scene = $.scene([
      new $.Image("./image.webp", { x: 100, y: 100 }),
      new $.Svg(
        `<title>Cat</title>
<desc>Stick Figure of Cat</desc>
<!-- 在这里绘制图像 -->
<circle cx='70' cy='95' r='50' style='stroke:red; fill:none'></circle>`,
        { width: 100, height: 0 },
      ),
    ]);
  }
});
car.play();
