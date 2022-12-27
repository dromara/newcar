import { Carobj } from "../index";

export class Line extends Carobj{
  
  #point1: number[]
  #point2: number[]

  constructor (
    theFirstPoint: number[],
    theSecondPoint: number[]
  ) {
    super();
    this.#point1 = theFirstPoint;
    this.#point2 = theSecondPoint;
  }

  #draway (ctx: CanvasRenderingContext2D) {
    // ......
  }
}