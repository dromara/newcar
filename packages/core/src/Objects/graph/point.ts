import { Carobj } from "../index";

export class Point extends Carobj {
  
  #x: number
  #y: number
  #name: string   // The name of the point.
  #displayPointName: boolean // Is or not is displaying the name of the point.
  #displayThePoint: boolean // Is or not is displaying the point.
  #pointRadius: number // The radius of the point,the default is 1px.

  constructor (
    x: number,
    y: number,
    name?: string,
    display?: boolean,
    radius?: number,
    displayName?: boolean
  ) {
    super();
    this.#x = x;
    this.#y = y;
    this.#name = name!;
    this.#displayThePoint = display!;
    this.#displayPointName = displayName!;
    if (typeof radius === "undefined") this.#pointRadius = 1;
    else this.#pointRadius = radius;
  }

  #draway (ctx: CanvasRenderingContext2D) {
    if (this.#displayThePoint) {
      // ......
    } else if (this.#displayPointName) {
      // ......
    }
  }
}