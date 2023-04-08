import { Carobj } from "./lib/carobj";
import { Text } from "./lib/text";
import { Spirit } from "./lib/spirit";
import { Point } from "./lib/point";
import { Line } from "./lib/line";
import { MathImage } from "./lib/mathImage";
import { Circle } from "./lib/circle";

export const object = ((exports: Record<string, any>) => {
  exports.Carobj = Carobj;
  exports.Text = Text;
  exports.Spirit = Spirit;
  exports.Point = Point;
  exports.Line = Line;
  exports.MathImage = MathImage;
  exports.Circle = Circle;
  return exports;
})({});
