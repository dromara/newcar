import { interpolator } from "../interpolator";
import type { Carobj } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const rotate: Animate = (
  object: Carobj,
  process: number,
  by: TimingFunction,
  params: {
    from?: number;
    to?: number;
  },
): void => {
  params.from ??= object.progress;
  params.to ??= object.progress;
  object.progress = interpolator(params.from, params.to, by)(process);
};
