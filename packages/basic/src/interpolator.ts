import type { TimingFunction } from "./timing-functions";
import { linear } from "./timing-functions";

/**
 * The interpolator.
 */
export class Interpolator {
  start: number;
  end: number;
  func: TimingFunction;

  /**
   * @param start The start value.
   * @param end The end value.
   * @param func The timing function.
   */
  constructor(start: number, end: number, func?: TimingFunction) {
    this.start = start;
    this.end = end;
    this.func = func ?? linear;
  }

  /**
   * Calculate the interpolation with the given progress number.
   * @param n The progress, between 0 and 1.
   * @returns The interpolation.
   */
  call(n: number): number {
    return this.start + this.func(n) * (this.end - this.start);
  }
}
