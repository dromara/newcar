import { interpolator } from "../interpolator";
import type { MathFunction } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const functionDivision: Animate = (
  object: MathFunction,
  process: number,
  by: TimingFunction,
  params: {
    from?: number;
    fromX?: number;
    fromY?: number;
    to?: number;
    toX?: number;
    toY?: number;
  },
): void => {
  params.fromX ??= params.from ?? object.divisionX;
  params.fromY ??= params.from ?? object.divisionY;
  params.toX ??= params.to ?? object.divisionX;
  params.toY ??= params.to ?? object.divisionY;
  object.divisionX = interpolator(params.fromX, params.toX, by)(process);
  object.divisionY = interpolator(params.fromY, params.toY, by)(process);
};
