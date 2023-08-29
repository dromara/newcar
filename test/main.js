/* eslint-disable @so1ve/prettier/prettier */
import { Car, animation, interpolator, object } from "./../packages/newcar/dist/newcar.js";

const car = new Car(document.querySelector("#mycanvas"), 60);

const fn = new object.MathImage((x) => Math.sin(x) - 3, 0, 0, {
  lineWidth: 2,
  color: "greenyellow",
  x_division: 80
});

const system = new object.CoordinateSystem(0, 0, 0, 0, {
  x: 800,
  y: 450,
  arrow: false,
  grid_color: "skyblue",
  x_point_interval: 80,
  x_number_trend: (x) => new object.Text(`${x}PI`, {}),
  children: [fn],
  y_direction: "bottom",
  x_direction: "left",
  // x_color: "skyblue"
});

const text = new object.Text("Hello world!", {
  x: 100,
  y: 100,
  size: 50,
  centerX: 100,
  centerY: 100
})

car.addObject(system, text);

car.addAnimationItem(
  new animation.AxisLimit2d(system, {
    startAt: 0,
    lastsFor: 50,
    to: [500, 350, -100, -100],
  }))
  .addAnimationItem(new animation.Limit(fn, {
    startAt: 50,
    lastsFor: 100,
    to: [0, 9],
    by: interpolator.easeOutSine,
  }))
  .addAnimationItem(new animation.Rotation(text, {
    startAt: 0,
    lastsFor: 100,
    to: 2 * Math.PI
  }))

car.play();
