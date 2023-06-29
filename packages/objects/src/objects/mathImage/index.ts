import { Carobj } from "../carobj";
import { carobject } from "../carobj/input_type";
import { mathimageobject } from "./input_type";
import { IMathImageLimit } from "./interface";

export class MathImage extends Carobj implements IMathImageLimit {
  #imageFunction: (arg0: number) => number;
  #startVariable: number;
  #endVariable: number;
  #color = "black";

  constructor(datas: mathimageobject & carobject) {
    super(datas);
    this.#imageFunction = datas.f;
    this.#startVariable = datas.start;
    this.#endVariable = datas.end;
    if (datas.color !== undefined) this.#color = datas.color!;
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    ctx.fillStyle = this.#color;
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

  get color() {
    return this.#color;
  }

  set color(value: string) {
    this.#color = value;
  }
}
