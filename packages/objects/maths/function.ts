import { Color } from "../../utils/color";
import type { CarobjOption } from "../carobj";
import { Carobj } from "../carobj";

export interface MathFunctionOption extends CarobjOption {
  color?: Color;
  lineWidth?: number;
  divisionX?: number;
  divisionY?: number;
}

export class MathFunction extends Carobj {
  func: (x: number) => number;
  startVariable: number;
  endVariable: number;
  lineWidth: number;
  divisionX: number;
  divisionY: number;
  color: Color;

  constructor(
    func: (x: number) => number,
    start: number,
    end: number,
    options?: MathFunctionOption,
  ) {
    super((options ??= {}));
    this.func = func;
    this.startVariable = start;
    this.endVariable = end;
    this.divisionX = options.divisionX ?? 50;
    this.divisionY = options.divisionY ?? 50;
    this.lineWidth = options.lineWidth ?? 2;
    this.color = options.color ?? Color.WHITE;
  }

  override draw(context: CanvasRenderingContext2D): void {
    context.strokeStyle = this.color.toString();
    context.beginPath();
    context.lineWidth = (this.lineWidth / this.divisionX) * 2;
    context.scale(this.divisionX, this.divisionY);
    context.moveTo(this.startVariable, this.func(this.startVariable));
    for (
      let variable = this.startVariable;
      variable <= this.endVariable;
      variable += 1 / this.divisionX
    ) {
      context.lineTo(variable, this.func(variable));
    }
    context.stroke();
  }
}
