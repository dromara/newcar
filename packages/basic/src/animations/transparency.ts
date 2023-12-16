import { interpolator } from "../interpolator";
import type { Carobj } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const transparency: Animate = (
  object: Carobj,
  process: number,
  by: TimingFunction,
  params: { from: number; to: number },
): void => {
  object.transparency = interpolator(
    params.from ?? object.transparency,
    params.to,
    by,
  )(process);
};
