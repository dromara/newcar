import { interpolator } from "../interpolator";
import type { MathFunction } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const functionDomain: Animate = (
  object: MathFunction,
  process: number,
  by: TimingFunction,
  params: {
    from?: number;
    fromStart?: number;
    fromEnd?: number;
    to?: number;
    toStart?: number;
    toEnd?: number;
  },
): void => {
  params.fromStart ??= params.from ?? object.domain[0];
  params.fromEnd ??= params.from ?? object.domain[1];
  params.toStart ??= params.to ?? object.domain[0];
  params.toEnd ??= params.to ?? object.domain[1];
  object.domain[0] = interpolator(
    params.fromStart,
    params.toStart,
    by,
  )(process);
  object.domain[1] = interpolator(params.fromEnd, params.toEnd, by)(process);
};
