import { interpolator } from "../interpolator";
import type { Arc } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const arcRadian: Animate = (
  object: Arc,
  process: number,
  by: TimingFunction,
  params: {
    from: number;
    fromStart: number;
    fromEnd: number;
    to: number;
    toStart: number;
    toEnd: number;
  },
): void => {
  params.fromStart ??= params.from ?? object.x;
  params.fromEnd ??= params.from ?? object.y;
  params.toStart ??= params.to ?? object.x;
  params.toEnd ??= params.to ?? object.y;
  object.from = interpolator(params.fromStart, params.fromEnd, by)(process);
  object.to = interpolator(params.toStart, params.toEnd, by)(process);
};
