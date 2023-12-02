import { interpolator } from "../interpolator";
import type { Circle } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const changeRadius: Animate = (
  object: Circle,
  duration: number,
  elapsed: number,
  params: { from: number; to: number; by: TimingFunction },
): void => {
  object.from = interpolator(
    object.from,
    params.from,
    params.by ?? ((x: number) => x),
  )(elapsed / duration);
  object.to = interpolator(
    object.to,
    params.to,
    params.by ?? ((x: number) => x),
  )(elapsed / duration);
};
