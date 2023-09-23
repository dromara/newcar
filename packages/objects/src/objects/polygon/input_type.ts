import type { Color } from "@newcar/utils";

export interface polygonobject {
  borderColor?: Color;
  fillColor?: Color | null;
  borderWidth?: number;
  lineJoin?: CanvasLineJoin;
}
