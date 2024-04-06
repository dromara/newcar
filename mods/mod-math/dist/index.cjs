'use strict';

var core = require('@newcar/core');
var utils = require('@newcar/utils');
var basic = require('@newcar/basic');

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class MathFunction extends core.Widget {
  constructor(fn, domain, options) {
    options ?? (options = {});
    super(options);
    this.fn = fn;
    this.domain = domain;
    __publicField$1(this, "path");
    __publicField$1(this, "paint");
    __publicField$1(this, "range");
    __publicField$1(this, "lineWidth");
    __publicField$1(this, "divisionX");
    __publicField$1(this, "divisionY");
    this.range = options.range ?? [-Infinity, Infinity];
    this.divisionX = options.divisionX ?? 50;
    this.divisionY = options.divisionY ?? 50;
    options.style ?? (options.style = {});
    this.style.width = options.style.width ?? 2;
    this.style.color = options.style.color ?? utils.Color.WHITE;
  }
  init(ck) {
    this.paint = new ck.Paint();
    this.paint.setColor(this.style.color.toFloat4());
    this.paint.setStyle(ck.PaintStyle.Stroke);
    this.paint.setStrokeWidth(this.style.width / this.divisionX * 2);
    this.path = new ck.Path();
    this.path.moveTo(this.domain[0], this.fn(this.domain[0]));
    for (let x = this.domain[0]; x <= this.domain[0] + (this.domain[1] - this.domain[0]) * this.progress; x += 1 / this.divisionX) {
      const value = this.fn(x);
      this.path.lineTo(x, value);
    }
  }
  predraw(ck, propertyChanged) {
    switch (propertyChanged) {
      case "fn":
      case "divisionX":
      case "divisionY":
      case "lineWidth":
      case "range":
      case "domain": {
        this.path.reset();
        this.path.moveTo(this.domain[0], this.fn(this.domain[0]));
        for (let x = this.domain[0]; x <= this.domain[0] + (this.domain[1] - this.domain[0]) * this.progress; x += 1 / this.divisionX) {
          const value = this.fn(x);
          this.path.lineTo(x, value);
        }
        break;
      }
      case "style.width": {
        this.paint.setStrokeWidth(this.style.width / this.divisionX * 2);
        break;
      }
      case "style.color": {
        this.paint.setColor(this.style.color.toFloat4());
        break;
      }
    }
  }
  draw(canvas) {
    canvas.scale(this.divisionX, this.divisionY);
    canvas.drawPath(this.path, this.paint);
  }
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class NumberAxis extends core.Widget {
  constructor(from, to, options) {
    options ?? (options = {});
    super(options);
    this.from = from;
    this.to = to;
    __publicField(this, "interval");
    __publicField(this, "trend");
    __publicField(this, "arrowOptions");
    __publicField(this, "tickOptions");
    __publicField(this, "arrow");
    __publicField(this, "ticks", []);
    this.trend = options.trend ?? ((counter) => counter);
    this.interval = options.interval ?? 50;
    options.style ?? (options.style = {});
    this.style.tickColor = options.style.tickColor ?? utils.Color.WHITE;
    this.style.tickHeight = options.style.tickHeight ?? [-5, 5];
    this.style.tickRotation = options.style.tickRotation ?? 0;
    this.style.tickWidth = options.style.tickWidth ?? 2;
    this.style.color = options.style.color ?? utils.Color.WHITE;
    this.arrowOptions = options.arrowOptions ?? {};
  }
  init(ck) {
    this.arrow = new basic.Arrow([this.from, 0], [this.to, 0], this.arrowOptions);
    for (let x = this.from; x <= this.to; x += this.interval) {
      this.ticks.push(
        new basic.Line(
          [x, this.style.tickHeight[0]],
          [x, this.style.tickHeight[1]],
          this.tickOptions
        )
      );
      console.log(x);
    }
    this.children.push(this.arrow, ...this.ticks);
  }
}

exports.MathFunction = MathFunction;
exports.NumberAxis = NumberAxis;
