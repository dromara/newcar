import { Carobj } from "./carobj";

export class Circle extends Carobj {
  #radius: number;
  #startAngle: number;
  #endAngle: number;
  #borderColor: string | null = null;
  #fillColor: string | undefined = undefined;

  constructor(
    x: number,
    y: number,
    radius: number,
    startAngle?: number,
    endAngle?: number,
    borderColor?: string | null,
    fillColor?: string | undefined
  ) {
    super();
    this.#radius = radius;
    this.x = x;
    this.y = y;
    typeof startAngle === "undefined" ? (this.#startAngle = 0) : (this.#startAngle = startAngle!);
    typeof endAngle === "undefined"
      ? (this.#endAngle = 2 * Math.PI)
      : (this.#endAngle = startAngle!);
    if (typeof borderColor !== "undefined") this.#borderColor = borderColor;
    if (typeof fillColor !== "undefined") this.#fillColor = fillColor;
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    ctx.beginPath();
    ctx.arc(
      this.x - this.#radius,
      this.y - this.#radius,
      this.#radius,
      this.#startAngle,
      this.#endAngle
    );
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
