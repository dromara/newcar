import { interpolator } from "../interpolator";
import type { Carobj } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const scale: Animate = (
  object: Carobj,
  process: number,
  by: TimingFunction,
  params: { x: number; y: number },
): void => {
  object.scaleX = interpolator(object.scaleX, params.x, by)(process);
  object.scaleY = interpolator(object.scaleY, params.y, by)(process);
};
