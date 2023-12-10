import type { Color } from "@newcar/utils/src/color";

import { Carobj } from "../carobj";
import type { NumberAxisOption } from "./number-axis";
import { NumberAxis } from "./number-axis";

type NumberPlaneAxisOption = Omit<NumberAxisOption, "tickHeight">;

export interface NumberPlaneOption extends NumberPlaneAxisOption {
  gridColor?: Color;
  axisX?: NumberPlaneAxisOption;
  axisY?: NumberPlaneAxisOption;
}

export class NumberPlane extends Carobj {
  axisX: NumberAxis;
  axisY: NumberAxis;

  constructor(
    public fromX: number,
    public toX: number,
    public fromY: number,
    public toY: number,
    options?: NumberPlaneOption,
  ) {
    super((options ??= {}));
    const optionY = { rotation: Math.PI / 2, ...options, ...options.axisY };
    this.axisX = new NumberAxis(fromX, toX, { ...options, ...options.axisX });
    this.axisY = new NumberAxis(fromY, toY, optionY);
  }

  override draw(context: CanvasRenderingContext2D): void {
    this.axisX.tickHeight = [
      this.axisY.to * this.axisY.unit,
      this.axisY.from * this.axisY.unit,
    ];
    this.axisY.tickHeight = [
      this.axisX.to * this.axisX.unit,
      this.axisX.from * this.axisX.unit,
    ];
    this.axisX.update(context);
    this.axisY.update(context);
  }
}
