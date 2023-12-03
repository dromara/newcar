import { interpolator } from "../interpolator";
import type { Circle } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const changeRadius: Animate = (
  object: Circle,
  process: number,
  by: TimingFunction,
  params: { from: number; to: number },
): void => {
  object.from = interpolator(object.from, params.from, by)(process);
  object.to = interpolator(object.to, params.to, by)(process);
};
