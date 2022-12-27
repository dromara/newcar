import { Line } from "./line";
import { Point } from "./point";

export class Parallel extends Line {
  
  #motherPoint: number[] | Point
  #motherLine: number[][] | Line

  constructor (
    motherPoint: number[] | Point,
    motherLine: number[][] | Line
  ) {
    super([0,0], [1,1])
  }
}