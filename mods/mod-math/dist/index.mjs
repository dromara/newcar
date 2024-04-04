import { Widget } from '@newcar/core';
import { Color } from '@newcar/utils';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class MathFunction extends Widget {
  constructor(fn, domain, options) {
    options ?? (options = {});
    super(options);
    this.fn = fn;
    this.domain = domain;
    __publicField(this, "path");
    __publicField(this, "paint");
    __publicField(this, "range");
    __publicField(this, "lineWidth");
    __publicField(this, "divisionX");
    __publicField(this, "divisionY");
    this.range = options.range ?? [-Infinity, Infinity];
    this.divisionX = options.divisionX ?? 50;
    this.divisionY = options.divisionY ?? 50;
    options.style ?? (options.style = {});
    this.style.width = options.style.width ?? 2;
    this.style.color = options.style.color ?? Color.WHITE;
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
        console.log(this.domain);
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

export { MathFunction };
