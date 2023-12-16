import { interpolator } from "../interpolator";
import type { Arc } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const radius: Animate = (
  object: Arc,
  process: number,
  by: TimingFunction,
  params: { from: number; to: number },
): void => {
  object.borderWidth = interpolator(params.from, params.to, by)(process);
};
