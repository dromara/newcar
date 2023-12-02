import { interpolator } from "../interpolator";
import type { Carobj } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const fadeOut: Animate = (
  object: Carobj,
  duration: number,
  elapsed: number,
  params: { by: TimingFunction },
): void => {
  object.transparency = interpolator(
    1,
    0,
    params.by ?? ((x: number) => x),
  )(elapsed / duration);
};
