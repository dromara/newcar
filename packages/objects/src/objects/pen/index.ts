import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";
import type { penobject } from "./input_type";

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
  #isWriting = false;
  #recordDatas: number[][][] = [];
  #index = -1;

  constructor(datas: carobject & penobject) {
    super(datas);
    this.#lineWidth = datas.lineWidth ?? 1;
    this.#color = datas.color ?? "white";
  }

  put() {
    if (this.#isWriting === true) {
      return;
    }
    this.#isWriting = true;
    // Change current index in `this.recordDatas`
    this.#index += 1;
    this.#recordDatas.push([]);
  }

  lift() {
    this.#isWriting = false;
  }

  override onDraw(ctx: CanvasRenderingContext2D): CanvasRenderingContext2D {
    ctx.strokeStyle = `${this.#color}`;
    ctx.lineWidth = this.#lineWidth;
    for (const state of this.#recordDatas) {
      ctx.beginPath();
      for (const position of state) {
        if (position.length !== 1) {
          // Because handwriting is the essence of a pen,
          // using this algorithm can keep the handwriting in place while the pen is moving
          ctx.lineTo(position[0] - this.x, position[1] - this.y);
        }
      }
      ctx.stroke();
    }
    if (this.#isWriting === false) {
      return ctx;
    }
    this.#recordDatas[this.#index].push([this.x, this.y]);

    return ctx;
  }
}
