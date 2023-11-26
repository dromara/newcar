import { interpolator } from "../interpolator";
import type { Carobj } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const moveTo: Animate = (
  object: Carobj,
  duration: number,
  elapsed: number,
  by: TimingFunction,
  params: { x: number; y: number },
): void => {
  object.x = interpolator(object.x, params.x, by)(elapsed / duration);
  object.y = interpolator(object.y, params.y, by)(elapsed / duration);
};
