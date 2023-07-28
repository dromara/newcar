import { Carobj } from "../carobj";
import { carobject } from "../carobj/input_type";
import { penobject } from "./input_type";

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
    this.#index += 1;
    this.#recordDatas.push([]);
    console.log("Hello world!")
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
