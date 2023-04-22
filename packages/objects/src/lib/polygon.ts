import { Carobj } from "./carobj";
import { type carobject } from "./carobj";
import { type Point } from "./point";

type polygonobject = {
  points: Point[];
  borderColor?: string;
  fillColor?: string;
  borderWidth?: number;
};

export class Polygon extends Carobj {
  points: Point[] = [];
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  borderColor: string = "black";
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  borderWidth: number = 1;
  fillColor: string | null = null;

  constructor(datas: carobject & polygonobject) {
    super(datas);
    this.points = datas.points;
    if (typeof datas.borderColor !== "undefined") this.borderColor = datas.borderColor;
    if (typeof datas.fillColor !== "undefined") this.fillColor = datas.fillColor;
    if (typeof datas.borderWidth !== "undefined") this.borderWidth = datas.borderWidth;
  }

  override onDraw(ctx: CanvasRenderingContext2D): CanvasRenderingContext2D {
    ctx.lineWidth = this.borderWidth;
    ctx.strokeStyle = `${this.borderColor}`;
    if (this.fillColor !== null) {
      ctx.fillStyle = `${this.fillColor}`;
    }
    ctx.moveTo(this.points[0].x, this.points[0].y);
    ctx.beginPath();
    this.points.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.lineTo(this.points[0].x, this.points[0].y);
    ctx.stroke();
    return ctx;
  }
}
