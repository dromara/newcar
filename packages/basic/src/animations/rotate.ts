import { interpolator } from "../interpolator";
import type { Carobj } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const rotate: Animate = (
  object: Carobj,
  process: number,
  by: TimingFunction,
  params: { to: number },
): void => {
  object.rotation = interpolator(object.rotation, params.to, by)(process);
};
