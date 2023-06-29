import type { Point } from "src/point";

export interface lineobject {
  startPoint: Point;
  endPoint: Point;
  color?: string;
  width?: number;
}
