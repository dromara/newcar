import * as $ from "newcar";

const s = $.sleep;

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
  .add(
    new $.NumberPlane(-5, 5, -5, 5, {
      x: 100,
      y: 100,
    })
  )
  .add(
    new $.Text("Hello world!")
  )
  .add(
    new $.NumberAxis(-5, 5, {
      x: 500,
      y: 500
    })
  )

const car = $.newcar("#test");
car.scene = scene;
car.play();

const recorder = new $.Recorder(car);
recorder.record(100, (url) => {
  console.log(url);
});
