import type { ILimitofAxisX, ILimitofAxisY } from "../interfaces/ILimit";
import type { ISystemDirection } from "../interfaces/ISystemDirection";
import { Color } from "../utils/color";
import type { carobject } from "./Carobj";
import { Carobj } from "./Carobj";
import { Text } from "./text";

export interface coordinate_systemobject {
  directionX?: "left" | "right";
  directionY?: "top" | "bottom";
  intervalX?: number;
  intervalY?: number;
  arrow?: boolean;
  displayPoint?: boolean;
  grid?: boolean;
  numberX?: boolean;
  numberY?: boolean;
  trendX?: (arg0: number) => Text;
  trendY?: (arg0: number) => Text;
  colorX?: Color;
  colorY?: Color;
  gridColor?: string;
}

export class CoordinateSystem
  extends Carobj
  implements ILimitofAxisX, ILimitofAxisY, ISystemDirection
{
  #maxX: number;
  #maxY: number;
  #minX: number;
  #minY: number;
  #directionX: "left" | "right";
  #directionY: "top" | "bottom";
  colorX: Color;
  intervalX: number;
  intervalY: number;
  arrow: boolean;
  displayPoint: boolean;
  colorY: Color;
  gridColor: string;
  grid: boolean;
  numberX: boolean;
  numberY: boolean;
  trendY: (arg0: number) => Text;
  trendX: (arg0: number) => Text;

  constructor(
    maxX: number,
    maxY: number,
    minX: number,
    minY: number,
    data?: coordinate_systemobject & carobject,
  ) {
    data = data ?? {};
    super(data);
    this.#maxX = maxX;
    this.#minX = minX;
    this.#maxY = maxY;
    this.#minY = minY;
    this.#directionX = data.directionX ?? "right";
    this.#directionY = data.directionY ?? "top";
    this.intervalX = data.intervalX ?? 50;
    this.intervalY = data.intervalY ?? 50;
    this.arrow = data.arrow ?? true;
    this.displayPoint = data.displayPoint ?? true;
    this.grid = data.grid ?? true;
    this.colorX = data.colorX ?? Color.rgb(255, 255, 255);
    this.colorY = data.colorY ?? Color.rgb(255, 255, 255);
    this.gridColor = data.gridColor ?? "white";
    this.numberX = data.numberX ?? true;
    this.numberY = data.numberY ?? true;
    this.trendY =
      data.trendY ?? ((numberCount: number) => new Text(String(numberCount), { x: 0, y: 0 }));
    this.trendX =
      data.trendX ?? ((numberCount: number) => new Text(String(numberCount), { x: 0, y: 0 }));
  }

  get maxX() {
    return this.#maxX;
  }

  set maxX(value: number) {
    this.#maxX = value;
  }

  get minX() {
    return this.#minX;
  }

  set minX(value: number) {
    this.#minX = value;
  }

  get maxY() {
    return this.#maxY;
  }

  set maxY(value: number) {
    this.#maxY = value;
  }

  get minY() {
    return this.#minY;
  }

  set minY(value: number) {
    this.#minY = value;
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

    if (this.#minX > 0) {
      throw new Error("Parameter `minX` cannot be greater than 0");
    }
    if (this.#maxX < 0) {
      throw new Error("Parameter `maxX` cannot be less than 0");
    }
    if (this.#minY > 0) {
      throw new Error("Parameter `minY` cannot be greater than 0");
    }
    if (this.#maxY < 0) {
      throw new Error("Parameter `maxY` cannot be less than 0");
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
      ctx.strokeStyle = `${this.gridColor.toString()}`;
      ctx.lineWidth = 1;
      for (let x = 0; x <= this.#maxX; x += this.intervalX) {
        ctx.moveTo(x, this.#maxY);
        ctx.lineTo(x, this.#minY);
      }
      for (let x = 0; x >= this.#minX; x -= this.intervalX) {
        ctx.moveTo(x, this.#maxY);
        ctx.lineTo(x, this.#minY);
      }
      for (let y = 0; y <= this.#maxY; y += this.intervalY) {
        ctx.moveTo(this.#maxX, y);
        ctx.lineTo(this.#minX, y);
      }
      for (let y = 0; y >= this.#minY; y -= this.intervalY) {
        ctx.moveTo(this.#maxX, y);
        ctx.lineTo(this.#minX, y);
      }
      ctx.stroke();
    }
    // draw axis X
    ctx.beginPath();
    ctx.strokeStyle = `${this.colorX.toString}`;
    ctx.lineWidth = 2;
    ctx.moveTo(this.#minX, 0);
    ctx.lineTo(this.#maxX, 0);
    if (this.arrow) {
      ctx.lineWidth = 2;
      ctx.moveTo(this.#maxX, 0);
      ctx.lineTo(this.#maxX - 6, 6);
      ctx.moveTo(this.#maxX, 0);
      ctx.lineTo(this.#maxX - 6, -6);
    }
    ctx.stroke();

    // draw axis Y
    ctx.beginPath();
    ctx.strokeStyle = `${this.colorY.toString()}`;
    ctx.lineWidth = 2;
    ctx.moveTo(0, this.#minY);
    ctx.lineTo(0, this.#maxY);
    if (this.arrow) {
      ctx.lineWidth = 2;
      ctx.moveTo(0, this.#maxY);
      ctx.lineTo(6, this.#maxY - 6);
      ctx.moveTo(0, this.#maxY);
      ctx.lineTo(-6, this.#maxY - 6);
    }
    ctx.stroke();

    // Draw number point;
    if (this.displayPoint) {
      ctx.beginPath();
      ctx.strokeStyle = `${this.colorX.toString()}`;
      ctx.lineWidth = 2;
      for (let x = 0; x <= this.#maxX; x += this.intervalX) {
        ctx.moveTo(x, 10);
        ctx.lineTo(x, -10);
      }
      for (let x = 0; x >= this.#minX; x -= this.intervalX) {
        ctx.moveTo(x, 10);
        ctx.lineTo(x, -10);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = `${this.colorY.toString()}`;
      ctx.lineWidth = 2;
      for (let y = 0; y <= this.#maxY; y += this.intervalY) {
        ctx.moveTo(10, y);
        ctx.lineTo(-10, y);
      }
      for (let y = 0; y >= this.#minY; y -= this.intervalY) {
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
      for (let x = 0; x <= this.#maxX; x += this.intervalX) {
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
      for (let x = 0; x >= this.#minX; x -= this.intervalX) {
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
      for (let x = 0; x <= this.#maxX; x += this.intervalX) {
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
      for (let x = 0; x >= this.#minX; x -= this.intervalX) {
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
      for (let y = 0; y <= this.#maxY; y += this.intervalY) {
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
      for (let y = 0; y >= this.#minY; y -= this.intervalY) {
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
      for (let y = 0; y <= this.#maxY; y += this.intervalY) {
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
      for (let y = 0; y >= this.#minY; y -= this.intervalY) {
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
