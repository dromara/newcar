// TODO: The thickness of MathImage
import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";
import type { mathimageobject } from "./input_type";
import type { IMathImageLimit } from "./interface";

export class MathImage extends Carobj implements IMathImageLimit {
  #imageFunction: (arg0: number) => number;
  #startVariable: number;
  #endVariable: number;
  #color = "white";
  #lineWidth: number;

  constructor(f: (x: number) => number, start: number, end: number, datas: mathimageobject & carobject) {
    super(datas);
    this.#imageFunction = f;
    this.#startVariable = start;
    this.#endVariable = end;
    this.#lineWidth = datas.lineWidth ?? 1;
    this.#color = datas.color ?? "white";
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    ctx.strokeStyle = this.#color;
    ctx.beginPath();
    ctx.lineWidth = this.#lineWidth
    ctx.moveTo(this.#startVariable, this.#imageFunction(this.#startVariable));
    for (let variable = this.#startVariable; variable <= this.#endVariable; variable++) {
      ctx.lineTo(variable, this.#imageFunction(variable));
    }
    ctx.stroke();

    return ctx;
  }

  get startVariable() {
    return this.#startVariable;
  }

  set startVariable(value: number) {
    this.#startVariable = value;
  }

  get endVariable() {
    return this.#endVariable;
  }

  set endVariable(value: number) {
    this.#endVariable = value;
  }

  get color() {
    return this.#color;
  }

  set color(value: string) {
    this.#color = value;
  }
}
