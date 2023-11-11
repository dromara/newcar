import type { Color } from "../../../../utils/src/color";
import type { CarobjOption } from "../carobj";
import { Circle } from "./circle";

export interface PointOption extends CarobjOption {
  radius?: number;
  fillColor?: Color;
}

export class Point extends Circle {
  /**
   * Point object.
   * @param options The options of the object.
   * @see PointOption
   */
  constructor(options?: PointOption) {
    super((options ??= {}).radius ?? 4, options);
  }
}
