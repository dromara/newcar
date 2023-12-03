import type { Carobj } from "../objects";
import type { TimingFunction } from "../timing-functions";

/**
 * A functional animation.
 * @param obj The Animated object.
 * @param process The process of the animation.
 * @param params Other parameters of the animation.
 */
export type Animate = (
  object: Carobj,
  process: number,
  by: TimingFunction,
  params: Record<string, any>,
) => void;
