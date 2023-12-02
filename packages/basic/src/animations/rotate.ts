import { interpolator } from "../interpolator";
import type { Carobj } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const rotate: Animate = (
  object: Carobj,
  duration: number,
  elapsed: number,
  params: { to: number; by: TimingFunction },
): void => {
  object.rotation = interpolator(
    object.rotation,
    params.to,
    params.by ?? ((x: number) => x),
  )(elapsed / duration);
};
