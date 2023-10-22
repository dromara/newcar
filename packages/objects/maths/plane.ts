import { Color } from "../../utils/color";
import type { CarobjOption } from "../carobj";
import { Carobj } from "../carobj";
import { Text } from "../text";
import type { Direction as DirectionX, Trend } from "./axis";

export type DirectionY = "top" | "bottom";

export interface NumberPlaneOption extends CarobjOption {
  arrow?: boolean;
  point?: boolean;
  numberX?: boolean;
  numberY?: boolean;
  intervalX?: number;
  intervalY?: number;
  colorX?: Color;
  colorY?: Color;
  gridColor?: Color;
  directionX?: DirectionX;
  directionY?: DirectionY;
  trendX?: Trend;
  trendY?: Trend;
}

export class NumberPlane extends Carobj {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  arrow: boolean;
  point: boolean;
  numberX: boolean;
  numberY: boolean;
  intervalX: number;
  intervalY: number;
  colorX: Color;
  colorY: Color;
  gridColor?: Color;
  directionX: DirectionX;
  directionY: DirectionY;
  trendX: Trend;
  trendY: Trend;

  constructor(
    maxX: number,
    maxY: number,
    minX: number,
    minY: number,
    options?: NumberPlaneOption,
  ) {
    super((options ??= {}));
    this.maxX = maxX;
    this.minX = minX;
    this.maxY = maxY;
    this.minY = minY;
    this.directionX = options.directionX ?? "right";
    this.directionY = options.directionY ?? "top";
    this.intervalX = options.intervalX ?? 50;
    this.intervalY = options.intervalY ?? 50;
    this.arrow = options.arrow ?? true;
    this.point = options.point ?? true;
    this.colorX = options.colorX ?? Color.WHITE;
    this.colorY = options.colorY ?? Color.WHITE;
    this.gridColor = options.gridColor;
    this.numberX = options.numberX ?? true;
    this.numberY = options.numberY ?? true;
    this.trendY =
      options.trendY ??
      ((numberCount: number) => new Text(String(numberCount), { x: 0, y: 0 }));
    this.trendX =
      options.trendX ??
      ((numberCount: number) => new Text(String(numberCount), { x: 0, y: 0 }));
  }

  override draw(ctx: CanvasRenderingContext2D): void {
    if (this.minX > 0) {
      throw new Error("Parameter `minX` MUST be less than 0.");
    }
    if (this.maxX < 0) {
      throw new Error("Parameter `maxX` MUST be greater than 0.");
    }
    if (this.minY > 0) {
      throw new Error("Parameter `minY` MUST be less than 0.");
    }
    if (this.maxY < 0) {
      throw new Error("Parameter `maxY` MUST be greater than 0.");
    }

    if (this.directionX === "left") {
      ctx.scale(-1, 1);
    }
    if (this.directionY === "top") {
      ctx.scale(1, -1);
    }

    // draw grid
    if (this.gridColor) {
      ctx.beginPath();
      ctx.strokeStyle = this.gridColor.toString();
      ctx.lineWidth = 1;
      for (let x = 0; x <= this.maxX; x += this.intervalX) {
        ctx.moveTo(x, this.maxY);
        ctx.lineTo(x, this.minY);
      }
      for (let x = 0; x >= this.minX; x -= this.intervalX) {
        ctx.moveTo(x, this.maxY);
        ctx.lineTo(x, this.minY);
      }
      for (let y = 0; y <= this.maxY; y += this.intervalY) {
        ctx.moveTo(this.maxX, y);
        ctx.lineTo(this.minX, y);
      }
      for (let y = 0; y >= this.minY; y -= this.intervalY) {
        ctx.moveTo(this.maxX, y);
        ctx.lineTo(this.minX, y);
      }
      ctx.stroke();
    }
    // draw axis X
    ctx.beginPath();
    ctx.strokeStyle = this.colorX.toString();
    ctx.lineWidth = 2;
    ctx.moveTo(this.minX, 0);
    ctx.lineTo(this.maxX, 0);
    if (this.arrow) {
      ctx.lineWidth = 2;
      ctx.moveTo(this.maxX, 0);
      ctx.lineTo(this.maxX - 6, 6);
      ctx.moveTo(this.maxX, 0);
      ctx.lineTo(this.maxX - 6, -6);
    }
    ctx.stroke();

    // draw axis Y
    ctx.beginPath();
    ctx.strokeStyle = this.colorY.toString();
    ctx.lineWidth = 2;
    ctx.moveTo(0, this.minY);
    ctx.lineTo(0, this.maxY);
    if (this.arrow) {
      ctx.lineWidth = 2;
      ctx.moveTo(0, this.maxY);
      ctx.lineTo(6, this.maxY - 6);
      ctx.moveTo(0, this.maxY);
      ctx.lineTo(-6, this.maxY - 6);
    }
    ctx.stroke();

    // Draw number point;
    if (this.point) {
      ctx.beginPath();
      ctx.strokeStyle = this.colorX.toString();
      ctx.lineWidth = 2;
      for (let x = 0; x <= this.maxX; x += this.intervalX) {
        ctx.moveTo(x, 10);
        ctx.lineTo(x, -10);
      }
      for (let x = 0; x >= this.minX; x -= this.intervalX) {
        ctx.moveTo(x, 10);
        ctx.lineTo(x, -10);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = this.colorY.toString();
      ctx.lineWidth = 2;
      for (let y = 0; y <= this.maxY; y += this.intervalY) {
        ctx.moveTo(10, y);
        ctx.lineTo(-10, y);
      }
      for (let y = 0; y >= this.minY; y -= this.intervalY) {
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
    if (this.directionX === "right" && this.numberX) {
      numberCount = 0;
      for (let x = 0; x <= this.maxX; x += this.intervalX) {
        if (numberCount) {
          const text = this.trendX(numberCount);
          text.x = x;
          text.y = 20;
          text.size = 20;
          text.update(ctx);
        }
        numberCount += 1;
      }

      numberCount = 0;
      for (let x = 0; x >= this.minX; x -= this.intervalX) {
        if (numberCount) {
          const text = this.trendX(numberCount);
          text.x = x;
          text.y = 20;
          text.size = 20;
          text.update(ctx);
        }
        numberCount -= 1;
      }
    } else if (this.directionX === "left" && this.numberX) {
      numberCount = 0;
      for (let x = 0; x <= this.maxX; x += this.intervalX) {
        if (numberCount) {
          const text = this.trendX(numberCount);
          text.x = -x;
          text.y = 20;
          text.size = 20;
          text.update(ctx);
        }
        numberCount += 1;
      }

      numberCount = 0;
      for (let x = 0; x >= this.minX; x -= this.intervalX) {
        if (numberCount) {
          const text = this.trendX(numberCount);
          text.x = -x;
          text.y = 20;
          text.size = 20;
          text.update(ctx);
        }
        numberCount -= 1;
      }
    }

    if (this.directionY === "top" && this.numberY) {
      numberCount = 0;
      for (let y = 0; y <= this.maxY; y += this.intervalY) {
        if (numberCount) {
          const text = this.trendY(numberCount);
          text.x = -20;
          text.y = -y;
          text.size = 20;
          text.update(ctx);
        }
        numberCount += 1;
      }

      numberCount = 0;
      for (let y = 0; y >= this.minY; y -= this.intervalY) {
        if (numberCount) {
          const text = this.trendY(numberCount);
          text.x = -20;
          text.y = -y;
          text.size = 20;
          text.update(ctx);
        }
        numberCount -= 1;
      }
    } else if (this.directionY === "bottom" && this.numberY) {
      numberCount = 0;
      for (let y = 0; y <= this.maxY; y += this.intervalY) {
        if (numberCount) {
          const text = this.trendY(numberCount);
          text.x = -20;
          text.y = y;
          text.size = 20;
          text.update(ctx);
        }
        numberCount += 1;
      }

      numberCount = 0;
      for (let y = 0; y >= this.minY; y -= this.intervalY) {
        if (numberCount) {
          const text = this.trendY(numberCount);
          text.x = -20;
          text.y = 20;
          text.update(ctx);
        }
        numberCount -= 1;
      }
    }

    const originText = this.trendX(0);
    originText.x = -10;
    originText.y = 10;
    originText.update(ctx);

    // Restore
    if (this.directionX === "left") {
      ctx.scale(-1, 1);
    }
    if (this.directionY === "top") {
      ctx.scale(1, -1);
    }
  }
}
