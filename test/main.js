/* eslint-disable @so1ve/prettier/prettier */
import { Car, animation, interpolator, object } from "./../packages/newcar/dist/newcar.js";

const car = new Car(document.querySelector("#mycanvas"), 60);

const fn1 = new object.MathImage(Math.sin, 0, 0, {
  lineWidth: 2,
  color: "greenyellow",
  x_division: 80
});
const fn2 = new object.MathImage(Math.cos, 0, 0, {
  color: "skyblue",
  x_division: 80,
})

const system = new object.CoordinateSystem(0, 0, 0, 0, {
  x: 800,
  y: 450,
  // arrow: false,
  grid_color: "skyblue",
  x_point_interval: 80,
  x_number_trend: ((count) => new object.Text(String(2 * count), {})),
  children: [fn1, fn2],
  // x_color: "skyblue"
});
const axis = new object.NumberAxis(100, -100, {
  x: 300,
  y: 300,
})

const text = new object.Text("Hello world!", {
  x: 100,
  y: 100,
  size: 50,
  centerX: 100,
  centerY: 100
})

car.addObject(system, text, axis);

car.addAnimationItem(
  new animation.AxisLimit2d(system, {
    startAt: 0,
    lastsFor: 50,
    to: [500, 350, -500, -350],
  }))
  .addAnimationItem(new animation.Limit(fn1, {
    startAt: 50,
    lastsFor: 100,
    to: [-6, 6],
    by: interpolator.easeOutSine,
  }))
  .addAnimationItem(new animation.Limit(fn2, {
    startAt: 50,
    lastsFor: 100,
    to: [-6, 6],
    by: interpolator.easeOutSine,
  }))
  .addAnimationItem(new animation.Rotation(text, {
    startAt: 0,
    lastsFor: 100,
    to: 2 * Math.PI
  }))

car.play();
