import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";
import type { coordinate_systemobject } from "./input_type";
import type { ILengthofAxisX, ILengthofAxisY, ISystemDirection } from "./interface";

export class CoordinateSystem
  extends Carobj
  implements ILengthofAxisX, ILengthofAxisY, ISystemDirection
{
  #axisPositiveXLength: number;
  #axisPositiveYLength: number;
  #axisXDirection: "left" | "right";
  #axisYDirection: "top" | "bottom";
  #color: string;
  #axisNegativeXLength: number;
  #axisNegativeYLength: number;

  constructor(
    axisPositiveXLength: number,
    axisPositiveYLength: number,
    axisNegativeXLength: number,
    axisNegativeYLength: number,
    datas: coordinate_systemobject & carobject,
  ) {
    super(datas);
    this.#axisPositiveXLength = axisPositiveXLength;
    this.#axisPositiveYLength = axisPositiveYLength;
    this.#axisNegativeXLength = axisNegativeXLength;
    this.#axisNegativeYLength = axisNegativeYLength;
    this.#axisXDirection = datas.axisXDirection ?? "right";
    this.#axisYDirection = datas.axisYDirection ?? "top";
    this.#color = datas.color ?? "white";
  }

  get axisNegativeXLength(): number {
    return this.#axisNegativeXLength;
  }

  set axisNegativeXLength(value: number) {
    this.#axisNegativeXLength = value;
  }

  get axisNegativeYLength(): number {
    return this.#axisNegativeYLength;
  }

  set axisNegativeYLength(value: number) {
    this.#axisNegativeYLength = value;
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

  get axisPositiveYLength(): number {
    return this.#axisPositiveYLength;
  }

  set axisPositiveYLength(value: number) {
    this.#axisPositiveYLength = value;
  }

  get axisPositiveXLength(): number {
    return this.#axisPositiveXLength;
  }

  set axisPositiveXLength(value: number) {
    this.#axisPositiveXLength = value;
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    if (this.#axisXDirection === "left") {
      ctx.scale(-1, 1);
    }
    if (this.#axisYDirection === "top") {
      ctx.scale(1, -1);
    }
    ctx.strokeStyle = `${this.#color}`;
    ctx.beginPath();
    // draw axis X
    ctx.moveTo(-this.#axisNegativeXLength, 0);
    ctx.lineTo(this.#axisPositiveXLength, 0);
    ctx.moveTo(this.#axisPositiveXLength, 0);
    ctx.lineTo(this.#axisPositiveXLength - 6, 6);
    ctx.moveTo(this.#axisPositiveXLength, 0);
    ctx.lineTo(this.#axisPositiveXLength - 6, -6);
    // draw axis Y
    ctx.moveTo(0, -this.#axisNegativeYLength);
    ctx.lineTo(0, this.#axisPositiveYLength);
    ctx.moveTo(0, this.#axisPositiveYLength);
    ctx.lineTo(6, this.#axisPositiveYLength - 6);
    ctx.moveTo(0, this.#axisPositiveYLength);
    ctx.lineTo(-6, this.#axisPositiveYLength - 6);
    ctx.stroke();

    return ctx;
  }
}
