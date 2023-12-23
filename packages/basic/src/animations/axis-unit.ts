import { interpolator } from "../interpolator";
import type { NumberAxis } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const axisUnit: Animate = (
  object: NumberAxis,
  process: number,
  by: TimingFunction,
  params: {
    from: number;
    to: number;
  },
): void => {
  object.unit = interpolator(
    params.from ?? object.unit,
    params.to,
    by,
  )(process);
};
