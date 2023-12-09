import { interpolator } from "../interpolator";
import type { Figure } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const changeBorder: Animate = (
  object: Figure,
  process: number,
  by: TimingFunction,
  params: { to: number },
): void => {
  object.borderWidth = interpolator(object.borderWidth, params.to, by)(process);
};
