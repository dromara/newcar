import { Carobj } from "./lib/carobj";
import { Text } from "./lib/text";
import { Spirit } from "./lib/spirit";
import { Point } from "./lib/point";
import { Line } from "./lib/line";
import { Definition } from "./lib/definition";
import { LineSegment } from "./lib/lineSegment";
import { Circle } from "./lib/circle";

export const object = ((exports: Record<string, any>) => {
  exports.Carobj = Carobj;
  exports.Text = Text;
  exports.Spirit = Spirit;
  exports.Point = Point;
  exports.Line = Line;
  exports.Definition = Definition;
  exports.LineSegment = LineSegment;
  exports.Circle = Circle;
  return exports;
})({});
