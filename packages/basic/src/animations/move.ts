import { Interpolator } from "../interpolator";
import type { Carobj } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animation } from "./animation";

export const moveTo: Animation = (
  obj: Carobj,
  frameCount: number,
  length: number,
  params: {
    x: number;
    y: number;
    by: TimingFunction;
  },
): void => {
  const interpolatorX = new Interpolator(obj.x, params.x, params.by);
  const interpolatorY = new Interpolator(obj.y, params.y, params.by);
  obj.x = interpolatorX.interpolate((frameCount + 1) / length);
  obj.y = interpolatorY.interpolate((frameCount + 1) / length);
};
