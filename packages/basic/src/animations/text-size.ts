import { interpolator } from "../interpolator";
import type { Text } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const textSize: Animate = (
  object: Text,
  process: number,
  by: TimingFunction,
  params: { from: number; to: number },
): void => {
  object.size = interpolator(
    params.from ?? object.size,
    params.to,
    by,
  )(process);
};
