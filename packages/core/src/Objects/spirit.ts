import { Carobj } from './index'

export class Spirit extends Carobj {
  
  #status: HTMLImageElement[]
  #x: number
  #y: number
  #statusNow: number

  constructor (
    width: number,
    length: number,
  ) {
    super(width, length);
  }

  deleteStatus (index: number) {
    delete this.#status[index]
  }

  set displayStatus (dis: [HTMLImageElement, number]) {
    if (typeof dis[1] === "undefined") {
      this.#status.push(dis[0]);
    } else {
      this.#status[dis[1]] = dis[0];
    }
  }

  #draway(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.#status[this.#statusNow],
      this.#x, this.#y
    );
    return ctx;
  }
  
  set status(value: number) {
    this.#statusNow = value;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  set x(value: number) {
    this.#x = value;
  }

  set y(value: number) {
    this.#y = value;
  }
  
  get sigh() {
    return "Spirit";
  }
}