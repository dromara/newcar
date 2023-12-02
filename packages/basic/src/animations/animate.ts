import type { Carobj } from "../objects";

// import type { TimingFunction } from "../timing-functions";

/**
 * A functional animation.
 * @param obj The Animated object.
 * @param duration The duration time of the animation.
 * @param elapsed The elapsed time of the animation.
 * @param params Other parameters of the animation.
 */
export type Animate = (
  object: Carobj,
  duration: number,
  elapsed: number,
  params: Record<string, any>,
) => void;
