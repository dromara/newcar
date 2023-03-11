import { Carobj, carobject } from "./carobj";

export type cameraobject = {
  x: number;
  y: number;
  width?: number;
  lenght?: number;
};

export class Camera extends Carobj {
  constructor(datas: cameraobject & carobject) {
    super(datas);
    this.x = datas.x;
    this.y = datas.y;
  }

  // override onSet(ctx: CanvasRenderingContext2D, element: HTMLElement): CanvasRenderingContext2D {
  //   ctx.translate(this.x, this.y);
  //   return ctx;
  // }
}
