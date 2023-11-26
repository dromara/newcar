import Markdown from "../../packages/mod-markdown/dist/newcar-mod-markdown.mjs";
import * as $ from "../../packages/newcar/dist/newcar.mjs";

const car = $.createCar("#test", [
  new Markdown("# Hello world! \n```javascript\nconsole.log()\n```"),
  new $.WebView("<div>hello</div>"),
  new $.WebView("<div>hello</div>"),
  // new $.Brace([0, 0], [100, 100], {
  //   x: 100,
  //   y: 100,
  // }),
  new $.Text("Hello world", {
    x: 100,
    y: 100,
  }),
]);

car.scene.setUpdate((frameCount) => {
  switch (frameCount) {
    case 100: {
      car.checkout(
        $.createScene([
          new $.Svg(
            `
            <svg width='140' heiight='170' xmlns='http://wwww.w3.org/2000/svg'>
  <title>Cat</title>
  <desc>Stick Figure of Cat</desc>
  <!-- 在这里绘制图像 -->
  <circle cx='70' cy='95' r='50' style='stroke:black; fill:none'></circle>
</svg>
            `,
          ),
          // new $.Image("./image.webp", {
          //   x: 100,
          //   y: 100,
          // }),
        ]),
      );
      break;
    }
  }
});

car.play();
