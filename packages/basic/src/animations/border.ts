import { interpolator } from "../interpolator";
import type { Figure } from "../objects";
import type { Text } from "../objects/text";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const border: Animate = (
  object: Figure | Text,
  process: number,
  by: TimingFunction,
  params: {
    from: number;
    to: number;
  },
): void => {
  object.borderWidth = interpolator(
    params.from ?? object.borderWidth,
    params.to,
    by,
  )(process);
};
