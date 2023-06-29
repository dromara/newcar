import type { Point } from "src/point";

export interface polygonobject {
  points: Point[];
  borderColor?: string;
  fillColor?: string;
  borderWidth?: number;
}
