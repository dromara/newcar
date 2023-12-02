import { interpolator } from "../interpolator";
import type { Carobj } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const scale: Animate = (
  object: Carobj,
  duration: number,
  elapsed: number,
  params: { x: number; y: number; by: TimingFunction },
): void => {
  object.scaleX = interpolator(
    object.scaleX,
    params.x,
    params.by ?? ((x: number) => x),
  )(elapsed / duration);
  object.scaleY = interpolator(
    object.scaleY,
    params.y,
    params.by ?? ((x: number) => x),
  )(elapsed / duration);
};
