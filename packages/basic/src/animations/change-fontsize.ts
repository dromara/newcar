import { interpolator } from "../interpolator";
import type { Text } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const changeFontsize: Animate = (
  object: Text,
  duration: number,
  elapsed: number,
  params: { to: number; by: TimingFunction },
): void => {
  object.size = interpolator(
    object.size,
    params.to,
    params.by ?? ((x: number) => x),
  )(elapsed / duration);
};
