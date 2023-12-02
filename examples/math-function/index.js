import * as $ from "../../packages/newcar/dist/newcar.mjs";

const car = $.newcar("#scene", [
  new $.NumberAxis(10, -10, {
    color: $.Color.CYAN,
    tick: 2,
    x: 800,
    y: 600,
    arrow: null,
    trend: { y: 16, size: 16 },
  }),
  new $.NumberAxis(5, 10, {
    x: 800,
    y: 400,
    trend: { font: "italic", x: -2, y: 30, size: 30 },
  }).animate($.moveTo, 100, {
    x: 200,
    y: 400,
  }),
  new $.NumberAxis(-10, -5, {
    x: 800,
    y: 200,
    interval: 0.5,
    unit: 150,
    rotation: 0.2,
  }),
]);

car.play();
