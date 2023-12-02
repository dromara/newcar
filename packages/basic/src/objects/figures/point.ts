import { toPosition } from "@newcar/utils/src";

import type { Bordered, Fillable } from "../interfaces";
import { Circle } from "./circle";

/**
 * The point options.
 * @param radius The radius of the point.
 * @see Fillable
 * @see Bordered
 * @see Point
 */
export type PointOption = { radius?: number } & Fillable & Bordered;

/**
 * The point object.
 */
export class Point extends Circle implements PointOption {
  /**
   * @param options The options of the object.
   * @see PointOption
   */
  constructor(point: Point, options?: PointOption) {
    super(
      (options ??= {}).radius ?? 4,
      Object.assign(options, toPosition(point)),
    );
  }
}
