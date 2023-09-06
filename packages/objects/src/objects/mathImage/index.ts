import { Color } from "@newcar/utils";

import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";
import type { mathimageobject } from "./input_type";
import type { IDivision, IMathImageLimit } from "./interface";

export class MathImage extends Carobj implements IMathImageLimit, IDivision {
  #imageFunction: (arg0: number) => number;
  #startVariable: number;
  #endVariable: number;
  #color = Color.rgb(255, 255, 255);
  #lineWidth: number;
  divisionX: number;
  divisionY: number;

  constructor(
    f: (x: number) => number,
    start: number,
    end: number,
    data?: mathimageobject & carobject,
  ) {
    data = data ?? {};
    super(data);
    this.#imageFunction = f;
    this.#startVariable = start;
    this.#endVariable = end;
    this.divisionX = data.divisionX ?? 50;
    this.divisionY = data.divisionY ?? 50;
    this.#lineWidth = data.lineWidth ?? 2;
    this.#color = data.color ?? Color.rgb(255, 255, 255);
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    ctx.strokeStyle = this.#color.toString();
    ctx.beginPath();
    ctx.lineWidth = (this.#lineWidth / this.divisionX) * 2;
    ctx.scale(this.divisionX, this.divisionY);
    ctx.moveTo(this.#startVariable, this.#imageFunction(this.#startVariable));
    for (
      let variable = this.#startVariable;
      variable <= this.#endVariable;
      variable += 1 / this.divisionX
    ) {
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

  set color(value: Color) {
    this.#color = value;
  }
}
