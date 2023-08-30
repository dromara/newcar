/* eslint-disable @so1ve/prettier/prettier */
import { Car, animation, interpolator, object, Color } from "./../packages/newcar/dist/newcar.js";

const car = new Car(document.querySelector("#mycanvas"), 60);

const fn1 = new object.MathImage(Math.sin, 0, 0, {
  lineWidth: 2,
  color: "greenyellow",
  x_division: 80,
});
const fn2 = new object.MathImage(Math.cos, 0, 0, {
  color: Color.rgb(255, 255, 255),
  x_division: 80,
});
const svg = new object.Svg("./logo.svg", 200, 2000, {});

const system = new object.CoordinateSystem(0, 0, 0, 0, {
  x: 800,
  y: 450,
  // arrow: false,
  grid_color: "skyblue",
  x_point_interval: 80,
  children: [fn1, fn2],
  // x_color: "skyblue"
});
const axis = new object.NumberAxis(100, -100, {
  x: 300,
  y: 300,
});

const text = new object.Text("Hello world!", {
  x: 100,
  y: 100,
  size: 50,
  centerX: 100,
  centerY: 100,
});

const circle = new object.Circle(100);

const webview = new object.WebView(
  `<div style="
    display: flex;
    justify-content: center;
    align-items: center;
  "><span style="font-size: 8em;">
  <span style="color: #7acbf5;">ne</span><span style="color: #eaacb8;">wc</span>ar
  </span></div>`,
  { x: 80, y: 600, width: 480, height: 160, centerX: 240, centerY: 80 }
);

car.addObject(system, text, circle, webview);

car
  .addAnimationItem(
    new animation.AxisLimit2d(system, {
      startAt: 0,
      lastsFor: 50,
      to: [500, 350, -500, -350],
    })
  )
  .addAnimationItem(
    new animation.Limit(fn1, {
      startAt: 50,
      lastsFor: 100,
      to: [-6, 6],
      by: interpolator.easeOutSine,
    })
  )
  .addAnimationItem(
    new animation.Limit(fn2, {
      startAt: 50,
      lastsFor: 100,
      to: [-6, 6],
      by: interpolator.easeOutSine,
    })
  )
  .addAnimationItem(
    new animation.Rotation(text, {
      startAt: 0,
      lastsFor: 100,
      to: 2 * Math.PI,
    })
  )
  .addAnimationItem(
    new animation.FontSize(text, {
      startAt: 0,
      lastsFor: 100,
      from: 10,
      to: 100,
    })
  )
  .addAnimationItem(
    new animation.Rotation(webview, {
      startAt: 0,
      lastsFor: 100,
      to: 2 * Math.PI,
    })
  )
  .addAnimationItem(
    new animation.Radius(circle, {
      startAt: 0,
      lastsFor: 100,
      to: 200,
    })
  );

car.play();
