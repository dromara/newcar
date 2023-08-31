import type { Carobj } from "../objects/carobj";

export function getAbsoluteCoordinate(object: Carobj) {
  const coordinate = [object.x, object.y];
  (function recursion(obj: Carobj) {
    if (obj.parent === null) {
      return;
    }
    coordinate[0] += obj.x;
    coordinate[1] += obj.y;
    recursion(obj.parent);
  })(object);

  return coordinate;
}
