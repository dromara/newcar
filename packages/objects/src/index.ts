import { Carobj } from "./objects/carobj";
import { Text } from "./objects/text";
import { Spirit } from "./objects/spirit";
import { Point } from "./objects/point";
import { Line } from "./objects/line";
import { MathImage } from "./objects/mathImage";
import { Circle } from "./objects/circle";
import { Polygon } from "./objects/polygon";

export const object = ((exports: Record<string, any>) => {
  exports.Carobj = Carobj;
  exports.Text = Text;
  exports.Spirit = Spirit;
  exports.Point = Point;
  exports.Line = Line;
  exports.MathImage = MathImage;
  exports.Circle = Circle;
  exports.Polygon = Polygon;
  return exports;
})({});
