import { Color } from "@newcar/utils/src";

import type { CarobjOption } from "../carobj";
import { Carobj } from "../carobj";
import type { Bordered, Fillable } from "../interfaces";

/**
 * The figure options.
 * @see CarobjOption
 * @see Bordered
 * @see Fillable
 */
export type FigureOption = CarobjOption & Bordered & Fillable;

/**
 * The figure object.
 */
export class Figure extends Carobj implements FigureOption {
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
