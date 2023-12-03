import { interpolator } from "../interpolator";
import type { Carobj } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const fadeOut: Animate = (
  object: Carobj,
  process: number,
  by: TimingFunction,
): void => {
  object.transparency = interpolator(1, 0, by)(process);
};
