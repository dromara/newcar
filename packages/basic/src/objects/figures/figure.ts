import { Color } from "@newcar/utils";

import type { CarObjectOption } from "../carobj";
import { CarObject } from "../carobj";
import type { Bordered, Fillable } from "../interfaces";

/**
 * The figure options.
 * @see CarObjectOption
 * @see Bordered
 * @see Fillable
 */
export type FigureOption = CarObjectOption & Bordered & Fillable;

/**
 * The figure object.
 */
export class Figure extends CarObject implements FigureOption {
  borderWidth: number;
  borderColor: Color;
  fillColor?: Color;

  /**
   * @param options The options of the object.
   * @see FigureOption
   */
  constructor(options?: FigureOption) {
    super((options ??= {}));
    this.borderWidth = options.borderWidth ?? 2;
    this.borderColor = options.borderColor ?? Color.WHITE;
    this.fillColor = options.fillColor;
  }
}
