/* eslint-disable no-console */
import * as $ from "../../packages/newcar/dist/newcar.mjs";

const s = $.sleep;

const scene = new $.Scene()
  .add(
    new $.Arrow([0, 0], [200, 200]).setup(async (obj) => {
      await s(200);
    }),
  )
  .add(
    new $.Arc(100)
      .setup(async (obj) => {
        await s(100);
        obj.animate($.changeProperty("radius", 0, 100), 100);
      }),
  )
  .add(
    new $.MathTex(`
    \\def\\d{\\mathrm{d}}
    \\oint_C \\vec{B}\\circ \\d\\vec{l} = \\mu_0 \\left( I_{\\text{enc}} + \\varepsilon_0 \\frac{\\d}{\\d t} \\int_S {\\vec{E} \\circ \\hat{n}}\\; \\d a \\right)
    `,
    {
      x: 100,
      y: 100,
      width: 600,
      height: 600
    }
  ))

const car = $.newcar("#test");
car.scene = scene;
car.play();

const recorder = new $.Recorder(car);
recorder.record(100, (url) => {
  console.log(url);
});
