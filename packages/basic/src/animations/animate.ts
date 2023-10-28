import type { Carobj } from "../objects";

/**
 * The callback function of animations.
 * @param arg0 Object.
 * @param arg1 The number from begin to current frame.
 * @param arg2 The length of the animation.
 * @param params Other parameters of the animation.
 */
export type AnimationFunction = (
  arg0: Carobj,
  arg1: number,
  arg2: number,
  params: any,
) => void;

export const animate: AnimationFunction = (
  _obj,
  _frameCount,
  _length,
): void => {};
