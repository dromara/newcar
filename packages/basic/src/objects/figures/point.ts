import type { CarobjOption } from "../carobj";
import type { Fillable } from "../interfaces";
import { Circle } from "./circle";

/**
 * The point options.
 * @param radius The radius of the point.
 * @see CarobjOption
 * @see Fillable
 * @see Point
 */
export interface PointOption extends CarobjOption, Fillable {
  radius?: number;
}

/**
 * The point object.
 */
export class Point extends Circle implements PointOption {
  /**
   * @param options The options of the object.
   * @see PointOption
   */
  constructor(options?: PointOption) {
    super((options ??= {}).radius ?? 4, options);
  }
}
