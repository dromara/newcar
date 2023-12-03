import { interpolator } from "../interpolator";
import type { Carobj } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const changeTransparency: Animate = (
  object: Carobj,
  process: number,
  by: TimingFunction,
  params: { to: number },
): void => {
  object.transparency = interpolator(
    object.transparency,
    params.to,
    by,
  )(process);
};
