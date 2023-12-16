import type { TimingFunction } from "./timing-functions";

export type Interpolator = (process: number) => number;

export const interpolator =
  (from: number, to: number, by: TimingFunction): Interpolator =>
  (process: number): number =>
    from + by(process) * (to - from);
