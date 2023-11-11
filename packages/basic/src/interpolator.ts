import type { TimingFunction } from "./timing-functions";
import { linear } from "./timing-functions";

/**
 * The interpolator class.
 */
export class Interpolator {
  start: number;
  end: number;
  interpolator: TimingFunction;

  /**
   * @param start The start value.
   * @param end The end value.
   * @param interpolator The timing function.
   */
  constructor(start: number, end: number, interpolator?: TimingFunction) {
    this.start = start;
    this.end = end;
    this.interpolator = interpolator ?? linear;
  }

  /**
   * Calculate the interpolation with the given progress number.
   * @param n The progress, between 0 and 1.
   * @returns The interpolation.
   */
  interpolate(n: number): number {
    return this.start + this.interpolator(n) * (this.end - this.start);
  }
}
