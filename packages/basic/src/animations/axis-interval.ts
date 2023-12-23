import { interpolator } from "../interpolator";
import type { NumberAxis } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const axisInterval: Animate = (
  object: NumberAxis,
  process: number,
  by: TimingFunction,
  params: {
    from: number;
    to: number;
  },
): void => {
  object.interval = interpolator(
    params.from ?? object.interval,
    params.to,
    by,
  )(process);
};
