import type { TimingFunction } from "./timing-functions";
import { linear } from "./timing-functions";

/**
 * The interpolator.
 */
export class Interpolator {
  /**
   * @param from The start value.
   * @param to The end value.
   * @param func The timing function.
   */
  constructor(
    public from: number,
    public to: number,
    public func: TimingFunction = linear,
  ) {}

  /**
   * Calculate the interpolation with the given progress number.
   * @param n The progress, between 0 and 1.
   * @returns The interpolation.
   */
  call(n: number): number {
    return this.from + this.func(n) * (this.to - this.from);
  }
}
