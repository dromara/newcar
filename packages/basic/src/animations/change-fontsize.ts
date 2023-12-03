import { interpolator } from "../interpolator";
import type { Text } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const changeFontsize: Animate = (
  object: Text,
  process: number,
  by: TimingFunction,
  params: { to: number },
): void => {
  object.size = interpolator(object.size, params.to, by)(process);
};
