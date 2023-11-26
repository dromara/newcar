import type { TimingFunction } from "./timing-functions";

export const interpolator =
  (from: number, to: number, by: TimingFunction) =>
  (n: number): number =>
    from + by(n) * (to - from);
