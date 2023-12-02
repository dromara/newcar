import { interpolator } from "../interpolator";
import type { Carobj } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const moveTo: Animate = (
  object: Carobj,
  duration: number,
  elapsed: number,
  params: { x: number; y: number; by: TimingFunction },
): void => {
  object.x = interpolator(object.x, params.x, params.by)(elapsed / duration);
  object.y = interpolator(object.y, params.y, params.by)(elapsed / duration);
};
