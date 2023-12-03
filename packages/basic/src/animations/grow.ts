import { interpolator } from "../interpolator";
import type { Carobj } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const grow: Animate = (
  object: Carobj,
  process: number,
  by: TimingFunction,
): void => {
  object.scaleX = interpolator(0, 1, by)(process);
  object.scaleY = interpolator(0, 1, by)(process);
};
