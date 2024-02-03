import * as $ from "newcar";

const s = $.sleep;

// const car = $.newcar("#test", [
//   new $.Arrow([100, 100], [50, 300])
//     .animate($.move, 100, {
//       toX: 200,
//       toY: 100,
//       fromX: 100,
//       fromY: 100,
//     })
//     .add(
//       new $.NumberPlane(-5, 5, -5, 5, {
//         x: 300,
//         y: 300,
//       })
//         .animate($.create, 100)
//         .add(new $.MathFunction((x) => Math.sin(x), -5, 5)),
//     ),
// ]);

const scene = new $.Scene()
  .add(
    new $.Arrow([0, 0], [200, 200]).setup(async (obj) => {
      await s(200);
    }),
  )
  .add(
    new $.Arc(100).setup(async (obj) => {
      await s(100);
      obj.animate($.changeProperty("radius", 0, 100), 100);
    }),
  )

const car = $.newcar("#test");
car.scene = scene;
car.play();

const recorder = new $.Recorder(car);
recorder.record(100, (url) => {
  console.log(url);
});
