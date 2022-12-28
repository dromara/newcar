export class Interpolator {
  #startValue: number;
  #endValue: number;
  #interpolator: (a: number) => number;
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
