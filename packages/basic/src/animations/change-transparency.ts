import { interpolator } from "../interpolator";
import type { Carobj } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const changeTransparency: Animate = (
  object: Carobj,
  duration: number,
  elapsed: number,
  params: { to: number; by: TimingFunction },
): void => {
  object.transparency = interpolator(
    object.transparency,
    params.to,
    params.by ?? ((x: number) => x),
  )(elapsed / duration);
};
