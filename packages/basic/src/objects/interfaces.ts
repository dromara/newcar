import type { Color } from "@newcar/utils/src";

/**
 * The interface to show the object has a border.
 * @param borderWidth The width of the border.
 * @param borderColor The color of the border.
 */
export interface Bordered {
  borderWidth?: number | null;
  borderColor?: Color;
}

/**
 * The interface to show the object is fillable.
 * @param fillColor The fill color.
 */
export interface Fillable {
  fillColor?: Color;
}
