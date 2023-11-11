import type { Carobj } from "../objects";

/**
 * The callback function of animations.
 * @param obj Object.
 * @param frameCount The number from begin to current frame.
 * @param length The length of the animation.
 * @param params Other parameters of the animation.
 */
export type Animation = (obj: Carobj, frameCount: number, length: number, params: any) => void;
