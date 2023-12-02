export type Vector = [number, number];
export interface Position {
  x: number;
  y: number;
}
export type Point = Vector | Position;

export const toVector = (point: Point): Vector =>
  Array.isArray(point) ? point : [point.x, point.y];

export const toPosition = (point: Point): Position =>
  Array.isArray(point) ? { x: point[0], y: point[1] } : point;
