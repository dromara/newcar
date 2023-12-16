import { interpolator } from "../interpolator";
import type { Figure } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const border: Animate = (
  object: Figure,
  process: number,
  by: TimingFunction,
  params: {
    from: number;
    to: number;
  },
): void => {
  object.borderWidth = interpolator(params.from, params.to, by)(process);
};
