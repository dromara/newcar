import { interpolator } from "../interpolator";
import type { CarObject } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

type NumbericKeys<T extends Record<string, any>> = {
  [K in keyof T]-?: T[K] extends number ? K : never;
}[keyof T];

export const changeProperty = (
  key:
    | NumbericKeys<CarObject>
    | [NumbericKeys<CarObject>, NumbericKeys<CarObject>],
  from?: number,
  to?: number,
): Animate =>
  Array.isArray(key)
    ? ((() => {
        const [keyX, keyY] = key;

        return (
          object: CarObject,
          process: number,
          by: TimingFunction,
          params: {
            from?: number;
            fromX?: number;
            fromY?: number;
            to?: number;
            toX?: number;
            toY?: number;
          },
        ): void => {
          params.fromX ??= from ?? params.from ?? from ?? object[keyX];
          params.fromY ??= to ?? params.from ?? object[keyY];
          params.toX ??= from ?? params.to ?? object[keyX];
          params.toY ??= to ?? params.to ?? object[keyY];
          object[keyX] = interpolator(params.fromX, params.toX, by)(process);
          object[keyY] = interpolator(params.fromY, params.toY, by)(process);
        };
      })() as Animate)
    : (((
        object: CarObject,
        process: number,
        by: TimingFunction,
        params: {
          from?: number;
          to?: number;
        },
      ): void => {
        params.from ??= from ?? object[key];
        params.to ??= to ?? object[key];
        object[key] = interpolator(params.from, params.to, by)(process);
      }) as Animate);
