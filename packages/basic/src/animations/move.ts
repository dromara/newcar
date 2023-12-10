import { interpolator } from "../interpolator";
import type { Carobj } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const move: Animate = (
  object: Carobj,
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
  params.fromX ??= params.from ?? object.x;
  params.fromY ??= params.from ?? object.y;
  params.toX ??= params.to ?? object.x;
  params.toY ??= params.to ?? object.y;
  object.x = interpolator(params.fromX, params.toX, by)(process);
  object.y = interpolator(params.fromY, params.toY, by)(process);
};
