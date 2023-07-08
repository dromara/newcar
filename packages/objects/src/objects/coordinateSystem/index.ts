import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";
import type { coordinate_systemobject } from "./input_type";
import { ILengthofAxisX, ILengthofAxisY, ISystemDirection } from "./interface"

export class CoordinateSystem extends Carobj implements ILengthofAxisX, ILengthofAxisY, ISystemDirection{
  #axisXLength: number;
  #axisYLength: number;
  #axisXDirection: "left" | "right";
  #axisYDirection: "top" | "bottom";

  constructor(datas: coordinate_systemobject & carobject) {
    super(datas);
    this.#axisXLength = datas.axisXLength ?? 100;
    this.#axisYLength = datas.axisYLength ?? 100;
    this.#axisXDirection = datas.axisXDirection ?? "right";
    this.#axisYDirection = datas.axisYDirection ?? "top"
  }

  get axisXDirection(): "left" | "right" {
    return this.#axisXDirection;
  }

  set axisXDirection(value: "left" | "right") {
    this.#axisXDirection = value;
  }
  
  get axisYDirection(): "top" | "bottom" {
    return this.#axisYDirection;
  }

  set axisYDirection(value: "top" | "bottom") {
    this.#axisYDirection = value;
  }

  get AxisYLength(): number {
    return this.#axisYLength;
  }

  set AxisYLength(value: number) {
    this.#axisYLength = value;
  }

  get AxisXLength(): number {
    return this.#axisXLength;
  }

  set AxisXLength(value: number) {
    this.#axisXLength = value;
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    if (this.#axisXDirection === "left") {
      ctx.scale(-1, 1);
    }
    if (this.#axisYDirection === "top") {
      ctx.scale(1, -1);
    }
    // draw axis X
    ctx.moveTo(-this.#axisXLength, 0);
    ctx.lineTo(this.#axisXLength, 0);
    ctx.moveTo(this.#axisXLength, 0);
    ctx.lineTo(this.#axisXLength - 6, 6);
    ctx.moveTo(this.#axisXLength, 0);
    ctx.lineTo(this.#axisXLength - 6, -6);
    // draw axis Y
    ctx.moveTo(0, -this.#axisYLength);
    ctx.lineTo(0, this.#axisYLength);
    ctx.moveTo(0, this.#axisYLength);
    ctx.lineTo(6, this.#axisYLength - 6);
    ctx.moveTo(0, this.#axisYLength);
    ctx.lineTo(-6, this.#axisYLength - 6);
    ctx.stroke();
    return ctx;
  }
}
