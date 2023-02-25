import { Carobj } from "./carobj";

export class Circle extends Carobj {
  #radius: number;
  #startAngle: number;
  #endAngle: number;
  #borderColor: string | null = null;
  #fillColor: string | undefined = undefined;

  constructor(datas: {
    x: number;
    y: number;
    radius: number;
    startAngle?: number;
    endAngle?: number;
    borderColor?: string | null;
    fillColor?: string | undefined;
  }) {
    super();
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
