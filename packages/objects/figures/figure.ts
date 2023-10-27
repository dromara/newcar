import { Color } from "../../utils/color";
import { Carobj } from "../carobj";
import type { FigureOption } from "./interfaces";

/**
 * Figure object.
 * @see Carobj
 * @see Bordered
 * @see Fillable
 */
export class Figure extends Carobj implements FigureOption {
  borderWidth: number;
  borderColor: Color;
  fillColor?: Color;

  constructor(options?: FigureOption) {
    super((options ??= {}));
    this.borderWidth = options.borderWidth ?? 2;
    this.borderColor = options.borderColor ?? Color.WHITE;
    this.fillColor = options.fillColor ?? undefined;
  }
}
