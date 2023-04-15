import { Carobj } from "./carobj";
import { type carobject } from "./carobj";
import { IPositionedMut } from "../interfaces/Positioned";
import { IMathImageLimit } from "../interfaces/MathImageLimit";

export type mathimageobject = { f: (arg0: number) => number; start: number; end: number };

export class MathImage extends Carobj implements IMathImageLimit, IPositionedMut {
  #imageFunction: (arg0: number) => number;
  #startVariable: number;
  #endVariable: number;

  constructor(datas: mathimageobject & carobject) {
    super(datas);
    this.#imageFunction = datas.f;
    this.#startVariable = datas.start;
    this.#endVariable = datas.end;
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    ctx.beginPath();
    ctx.moveTo(this.#startVariable, this.#imageFunction(this.#startVariable));
    let variable = this.#startVariable;
    for (variable; variable <= this.#endVariable; variable += 1) {
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
}
