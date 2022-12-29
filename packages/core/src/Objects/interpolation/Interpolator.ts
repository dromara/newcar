/**
 * The interpolator class.
 */
export class Interpolator {
  #startValue: number;
  #endValue: number;
  #interpolator: (a: number) => number;

  /**
   * To construct an interpolator.
   * @param startValue The start value of it.
   * @param endValue The end value of it.
   * @param interpolationFunction The interpolation function, which receives a real number between 0 and 1 (representing the progress of time) and returns a number between 0 and 1 to represent the progress of the resulting value. The closer to 1 the return value is, the closer to `endValue` the interpolate value will be, otherwise the interpolated value will be closer to `startValue`.
   */
  constructor(startValue: number, endValue: number, interpolationFunction: (a: number) => number) {
    this.#startValue = startValue;
    this.#endValue = endValue;
    this.#interpolator = interpolationFunction;
  }

  /**
   * Calculate the interpolation with the given progress number.
   * @param n The progress, between 0 and 1
   * @returns The interpolation.
   */
  interpolate(n: number): number {
    return this.#startValue + this.#interpolator(n) * (this.#endValue - this.#startValue);
  }
}
