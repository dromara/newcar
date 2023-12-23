import { interpolator } from "../interpolator";
import type { NumberAxis } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const axisTickRotate: Animate = (
  object: NumberAxis,
  process: number,
  by: TimingFunction,
  params: {
    from: number;
    to: number;
  },
): void => {
  object.tickRotation = interpolator(
    params.from ?? object.tickRotation,
    params.to,
    by,
  )(process);
};
