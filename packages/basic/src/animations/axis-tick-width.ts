import { interpolator } from "../interpolator";
import type { NumberAxis } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const axisTickWidth: Animate = (
  object: NumberAxis,
  process: number,
  by: TimingFunction,
  params: {
    from: number;
    to: number;
  },
): void => {
  object.tickWidth = interpolator(
    params.from ?? object.tickWidth,
    params.to,
    by,
  )(process);
};
