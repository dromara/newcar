import { Color } from "@newcar/utils";

import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";
import { Text } from "../text";
import type { coordinate_systemobject } from "./input_type";
import type { ILimitofAxisX, ILimitofAxisY, ISystemDirection } from "./interface";

export class CoordinateSystem
  extends Carobj
  implements ILimitofAxisX, ILimitofAxisY, ISystemDirection
{
  #x_max: number;
  #y_max: number;
  #x_min: number;
  #y_min: number;
  #directionX: "left" | "right";
  #directionY: "top" | "bottom";
  colorX: Color;
  intervalX: number;
  intervalY: number;
  arrow: boolean;
  displayPoint: boolean;
  colorY: Color;
  grid_color: string;
  grid: boolean;
  numberX: boolean;
  numberY: boolean;
  trendY: (arg0: number) => Text;
  trendX: (arg0: number) => Text;

  constructor(
    x_max: number,
    y_max: number,
    x_min: number,
    y_min: number,
    data?: coordinate_systemobject & carobject,
  ) {
    data = data ?? {};
    super(data);
    this.#x_max = x_max;
    this.#x_min = x_min;
    this.#y_max = y_max;
    this.#y_min = y_min;
    this.#directionX = data.directionX ?? "right";
    this.#directionY = data.directionY ?? "top";
    this.intervalX = data.intervalX ?? 50;
    this.intervalY = data.intervalY ?? 50;
    this.arrow = data.arrow ?? true;
    this.displayPoint = data.displayPoint ?? true;
    this.grid = data.grid ?? true;
    this.colorX = data.colorX ?? Color.rgb(255, 255, 255);
    this.colorY = data.colorY ?? Color.rgb(255, 255, 255);
    this.grid_color = data.grid_color ?? "white";
    this.numberX = data.numberX ?? true;
    this.numberY = data.numberY ?? true;
    this.trendY =
      data.trendY ?? ((numberCount: number) => new Text(String(numberCount), { x: 0, y: 0 }));
    this.trendX =
      data.trendX ?? ((numberCount: number) => new Text(String(numberCount), { x: 0, y: 0 }));
  }

  get x_max() {
    return this.#x_max;
  }

  set x_max(value: number) {
    this.#x_max = value;
  }

  get x_min() {
    return this.#x_min;
  }

  set x_min(value: number) {
    this.#x_min = value;
  }

  get y_max() {
    return this.#y_max;
  }

  set y_max(value: number) {
    this.#y_max = value;
  }

  get y_min() {
    return this.#y_min;
  }

  set y_min(value: number) {
    this.#y_min = value;
  }

  get directionX() {
    return this.#directionX;
  }

  set directionX(value: "left" | "right") {
    this.#directionX = value;
  }

  get directionY() {
    return this.#directionY;
  }

  set directionY(value: "top" | "bottom") {
    this.#directionY = value;
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);

    if (this.#x_min > 0) {
      throw new Error("Parameter `x_min` cannot be greater than 0");
    }
    if (this.#x_max < 0) {
      throw new Error("Parameter `x_max` cannot be less than 0");
    }
    if (this.#y_min > 0) {
      throw new Error("Parameter `y_min` cannot be greater than 0");
    }
    if (this.#y_max < 0) {
      throw new Error("Parameter `y_max` cannot be less than 0");
    }

    if (this.#directionX === "left") {
      ctx.scale(-1, 1);
    }
    if (this.#directionY === "top") {
      ctx.scale(1, -1);
    }

    // draw grid
    if (this.grid) {
      ctx.beginPath();
      ctx.strokeStyle = `${this.grid_color.toString()}`;
      ctx.lineWidth = 1;
      for (let x = 0; x <= this.#x_max; x += this.intervalX) {
        ctx.moveTo(x, this.#y_max);
        ctx.lineTo(x, this.#y_min);
      }
      for (let x = 0; x >= this.#x_min; x -= this.intervalX) {
        ctx.moveTo(x, this.#y_max);
        ctx.lineTo(x, this.#y_min);
      }
      for (let y = 0; y <= this.#y_max; y += this.intervalY) {
        ctx.moveTo(this.#x_max, y);
        ctx.lineTo(this.#x_min, y);
      }
      for (let y = 0; y >= this.#y_min; y -= this.intervalY) {
        ctx.moveTo(this.#x_max, y);
        ctx.lineTo(this.#x_min, y);
      }
      ctx.stroke();
    }
    // draw axis X
    ctx.beginPath();
    ctx.strokeStyle = `${this.colorX.toString}`;
    ctx.lineWidth = 2;
    ctx.moveTo(this.#x_min, 0);
    ctx.lineTo(this.#x_max, 0);
    if (this.arrow) {
      ctx.lineWidth = 2;
      ctx.moveTo(this.#x_max, 0);
      ctx.lineTo(this.#x_max - 6, 6);
      ctx.moveTo(this.#x_max, 0);
      ctx.lineTo(this.#x_max - 6, -6);
    }
    ctx.stroke();

    // draw axis Y
    ctx.beginPath();
    ctx.strokeStyle = `${this.colorY.toString()}`;
    ctx.lineWidth = 2;
    ctx.moveTo(0, this.#y_min);
    ctx.lineTo(0, this.#y_max);
    if (this.arrow) {
      ctx.lineWidth = 2;
      ctx.moveTo(0, this.#y_max);
      ctx.lineTo(6, this.#y_max - 6);
      ctx.moveTo(0, this.#y_max);
      ctx.lineTo(-6, this.#y_max - 6);
    }
    ctx.stroke();

    // Draw number point;
    if (this.displayPoint) {
      ctx.beginPath();
      ctx.strokeStyle = `${this.colorX.toString()}`;
      ctx.lineWidth = 2;
      for (let x = 0; x <= this.#x_max; x += this.intervalX) {
        ctx.moveTo(x, 10);
        ctx.lineTo(x, -10);
      }
      for (let x = 0; x >= this.#x_min; x -= this.intervalX) {
        ctx.moveTo(x, 10);
        ctx.lineTo(x, -10);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = `${this.colorY.toString()}`;
      ctx.lineWidth = 2;
      for (let y = 0; y <= this.#y_max; y += this.intervalY) {
        ctx.moveTo(10, y);
        ctx.lineTo(-10, y);
      }
      for (let y = 0; y >= this.#y_min; y -= this.intervalY) {
        ctx.moveTo(10, y);
        ctx.lineTo(-10, y);
      }
      ctx.stroke();
    }

    // To avoid text inversion, restore the coordinate system to its original state here

    if (this.directionX === "left") {
      ctx.scale(-1, 1);
    }
    if (this.directionY === "top") {
      ctx.scale(1, -1);
    }

    // draw number

    let numberCount = 0;
    if (this.#directionX === "right" && this.numberX) {
      numberCount = 0;
      for (let x = 0; x <= this.#x_max; x += this.intervalX) {
        if (numberCount !== 0) {
          const text = this.trendX(numberCount);
          text.x = x;
          text.y = 20;
          text.size = 20;
          text.onUpdate(ctx);
        }
        numberCount += 1;
      }

      numberCount = 0;
      for (let x = 0; x >= this.#x_min; x -= this.intervalX) {
        if (numberCount !== 0) {
          const text = this.trendX(numberCount);
          text.x = x;
          text.y = 20;
          text.size = 20;
          text.onUpdate(ctx);
        }
        numberCount -= 1;
      }
    } else if (this.#directionX === "left" && this.numberX) {
      numberCount = 0;
      for (let x = 0; x <= this.#x_max; x += this.intervalX) {
        if (numberCount !== 0) {
          const text = this.trendX(numberCount);
          text.x = -x;
          text.y = 20;
          text.size = 20;
          text.onUpdate(ctx);
        }
        numberCount += 1;
      }

      numberCount = 0;
      for (let x = 0; x >= this.#x_min; x -= this.intervalX) {
        if (numberCount !== 0) {
          const text = this.trendX(numberCount);
          text.x = -x;
          text.y = 20;
          text.size = 20;
          text.onUpdate(ctx);
        }
        numberCount -= 1;
      }
    }

    if (this.#directionY === "top" && this.numberY) {
      numberCount = 0;
      for (let y = 0; y <= this.#y_max; y += this.intervalY) {
        if (numberCount !== 0) {
          const text = this.trendY(numberCount);
          text.x = -20;
          text.y = -y;
          text.size = 20;
          text.onUpdate(ctx);
        }
        numberCount += 1;
      }

      numberCount = 0;
      for (let y = 0; y >= this.#y_min; y -= this.intervalY) {
        if (numberCount !== 0) {
          const text = this.trendY(numberCount);
          text.x = -20;
          text.y = -y;
          text.size = 20;
          text.onUpdate(ctx);
        }
        numberCount -= 1;
      }
    } else if (this.#directionY === "bottom" && this.numberY) {
      numberCount = 0;
      for (let y = 0; y <= this.#y_max; y += this.intervalY) {
        if (numberCount !== 0) {
          const text = this.trendY(numberCount);
          text.x = -20;
          text.y = y;
          text.size = 20;
          text.onUpdate(ctx);
        }
        numberCount += 1;
      }

      numberCount = 0;
      for (let y = 0; y >= this.#y_min; y -= this.intervalY) {
        if (numberCount !== 0) {
          const text = this.trendY(numberCount);
          text.x = -20;
          text.y = 20;
          text.onUpdate(ctx);
        }
        numberCount -= 1;
      }
    }

    const originText = this.trendX(0);
    originText.x = -10;
    originText.y = 10;
    originText.onUpdate(ctx);

    // Restore
    if (this.#directionX === "left") {
      ctx.scale(-1, 1);
    }
    if (this.#directionY === "top") {
      ctx.scale(1, -1);
    }

    return ctx;
  }
}
