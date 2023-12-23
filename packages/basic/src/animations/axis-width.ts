import { interpolator } from "../interpolator";
import type { NumberAxis } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const axisWidth: Animate = (
  object: NumberAxis,
  process: number,
  by: TimingFunction,
  params: {
    from: number;
    to: number;
  },
): void => {
  object.axisWidth = interpolator(
    params.from ?? object.axisWidth,
    params.to,
    by,
  )(process);
};
