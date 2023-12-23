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
  params.fromStart ??= params.from ?? object.start;
  params.fromEnd ??= params.from ?? object.end;
  params.toStart ??= params.to ?? object.start;
  params.toEnd ??= params.to ?? object.end;
  object.start = interpolator(params.fromStart, params.fromEnd, by)(process);
  object.end = interpolator(params.toStart, params.toEnd, by)(process);
};
