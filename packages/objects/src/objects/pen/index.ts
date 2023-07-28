import { Carobj } from "../carobj";
import { carobject } from "../carobj/input_type";
import { penobject } from "./input_type";

/**
 * In this instance, there is a variable named `this.#recordDatas`.
 * 
 * Because the user's handwriting will be intermittent
 * when calling the 'put' and 'lift' methods in the drawing process,
 * the first layer of this list is intermittent handwriting
 * 
 * The second layer stores a list of coordinates for each move.
 */

export class Pen extends Carobj {
  #lineWidth: number;
  #color: string;
  #isWriting: boolean = false;
  #recordDatas: number[][][] = []
  #index: number = -1;

  constructor(datas: carobject & penobject) {
    super(datas);
    this.#lineWidth = datas.lineWidth ?? 1;
    this.#color = datas.color ?? "white";
  }

  put() {
    console.log(this.#isWriting)
    if (this.#isWriting === true) return;
    this.#isWriting = true;
    // Change current index in `this.recordDatas`
    this.#index += 1;
    this.#recordDatas.push([]);
  }

  lift() {
    this.#isWriting = false;
  }

  override onDraw(ctx: CanvasRenderingContext2D, element?: HTMLElement | undefined): CanvasRenderingContext2D {
    ctx.strokeStyle = `${this.#color}`;
    ctx.lineWidth = this.#lineWidth;
    this.#recordDatas.forEach((state) => {
      ctx.beginPath();
      state.forEach((position) => {
        if (position.length !== 1) {
          // Because handwriting is the essence of a pen,
          // using this algorithm can keep the handwriting in place while the pen is moving
          ctx.lineTo(position[0] - this.x, position[1] - this.y);
        }
      })
      ctx.stroke();
    });
    console.log(this.#recordDatas, this.#index);
    if (this.#isWriting === false) return ctx;
    this.#recordDatas[this.#index].push([this.x, this.y])
  }
}
