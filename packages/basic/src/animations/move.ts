import { Interpolator } from "../interpolator";
import type { Carobj } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const move: Animate = (
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
  obj.x = interpolatorX.call((frameCount + 1) / length);
  obj.y = interpolatorY.call((frameCount + 1) / length);
};
