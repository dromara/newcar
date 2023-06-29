import { Carobj } from "./objects/carobj";
import { Circle } from "./objects/circle";
import { Line } from "./objects/line";
import { MathImage } from "./objects/mathImage";
import { Point } from "./objects/point";
import { Polygon } from "./objects/polygon";
import { Spirit } from "./objects/spirit";
import { Text } from "./objects/text";

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
