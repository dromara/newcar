import { Interpolator } from "../interpolations/interpolator";
import { LinearInterpolator } from "../interpolations/linearInterpolator";
import type { Carobj } from "../objects";
import type { AnimationFunction } from "./animate";

export const translate: AnimationFunction = (
  obj: Carobj,
  frameCount,
  length,
  params: {
    x: number;
    y: number;
    by: (arg0: number) => number;
  },
): void => {
  const interpolatorX = new Interpolator(
    obj.x,
    params.x,
    params.by ?? LinearInterpolator,
  );
  const interpolatorY = new Interpolator(
    obj.y,
    params.y,
    params.by ?? LinearInterpolator,
  );
  obj.x = interpolatorX.interpolate((frameCount + 1) / length);
  obj.y = interpolatorY.interpolate((frameCount + 1) / length);
};
