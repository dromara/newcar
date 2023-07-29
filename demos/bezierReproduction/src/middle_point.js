import * as newcar from "../../../packages/newcar/dist/newcar.js"

export class MiddlePoint extends newcar.object.Point {
  constructor(line, datas) {
    super(datas);
    this.line = line;
  }

  onAppend() {
    this.x = Math.abs(this.line.endX + this.line.startX) / 2
    this.y = Math.abs(this.line.endY + this.line.startY) / 2
    console.log(this.x, this.y)
  }
}
