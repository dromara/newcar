import * as $ from "newcar";
$.config.canvaskitWasmFile =
  "../node_modules/canvaskit-wasm/bin/canvaskit.wasm";

const s = $.sleep;

const scene = new $.Scene()

  .add(
    new $.Arc(100, {
      borderColor: $.Color.parse("red"),
    }),
  )
  .add(
    new $.Rectangle(0, 0, 100, 200)
      .setup(async (obj) => {
        await s(100);
        obj.animate($.move, 100, {
          to: 100,
        });
      })
      .add(new $.Arrow([0, 0], [200, 200])),
  )
  .add(
    new $.NumberPlane(-5, 5, -5, 5, {
      x: 100,
      y: 100,
    }).add(new $.MathFunction(Math.sin, -5, 5).animate($.create, 100)),
  )
  .add(new $.Text("Hello world!"))
  .add(
    new $.NumberAxis(-5, 5, {
      x: 500,
      y: 500,
    }),
  );

const car = $.newcar("#canvas");
car.scene = scene;
car.on("ready-to-play", () => {
  car.play();
});

// const recorder = new $.Recorder(car);
// recorder.record(100, (url) => {
//   console.log(url);
// });
