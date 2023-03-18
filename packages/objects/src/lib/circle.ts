import { Carobj } from "./carobj";
import { type carobject } from "./carobj";

export type circleobject = {
  x: number;
  y: number;
  radius: number;
  startAngle?: number;
  endAngle?: number;
  borderColor?: string | null;
  fillColor?: string | undefined;
};

export class Circle extends Carobj {
  #radius: number;
  #startAngle: number;
  #endAngle: number;
  #borderColor: string | null = null;
  #fillColor: string | undefined = undefined;

  constructor(datas: circleobject & carobject) {
    super(datas);
    this.#radius = datas.radius;
    this.x = datas.x;
    this.y = datas.y;
    typeof datas.startAngle === "undefined"
      ? (this.#startAngle = 0)
      : (this.#startAngle = datas.startAngle!);
    typeof datas.endAngle === "undefined"
      ? (this.#endAngle = 2 * Math.PI)
      : (this.#endAngle = datas.startAngle!);
    if (typeof datas.borderColor !== "undefined") this.#borderColor = datas.borderColor;
    if (typeof datas.fillColor !== "undefined") this.#fillColor = datas.fillColor;
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    ctx.moveTo(this.contextX, this.contextY);
    ctx.beginPath();
    ctx.arc(0, 0, this.#radius, this.#startAngle, this.#endAngle);
    if (typeof this.#fillColor !== "undefined") {
      ctx.fillStyle = this.#fillColor!;
      ctx.fill();
    }
    ctx.strokeStyle = this.#borderColor!;
    ctx.stroke();
    return ctx;
  }

  get startAngle() {
    return this.#startAngle;
  }

  set startAngle(value: number) {
    this.#startAngle = value;
  }

  get endAngle() {
    return this.#endAngle;
  }

  set endAngle(value: number) {
    this.#endAngle = value;
  }
}
