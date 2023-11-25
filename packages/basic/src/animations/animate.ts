import type { Carobj } from "../objects";

/**
 * A functional animation.
 * @param obj Object.
 * @param frameCount The number from begin to current frame.
 * @param length The length of the animation.
 * @param params Other parameters of the animation.
 */
export type Animate = (
  obj: Carobj,
  frameCount: number,
  length: number,
  params: any,
) => void;
