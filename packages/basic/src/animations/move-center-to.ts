import { interpolator } from "../interpolator";
import type { Carobj } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const moveCenterTo: Animate = (
  object: Carobj,
  process: number,
  by: TimingFunction,
  params: { x: number; y: number },
): void => {
  object.centerX = interpolator(object.x, params.x, by)(process);
  object.centerY = interpolator(object.y, params.y, by)(process);
};
