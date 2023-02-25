import { Carobj } from "./carobj";
import { IPositionedMut } from "../interfaces/Positioned";
import { ISpiritStatus } from "../interfaces/SpiritStatus";

export class Spirit extends Carobj implements IPositionedMut, ISpiritStatus {
  /**
   * You can set different types of status,the spirit only display one of all until you change it.
   */

  #status: HTMLImageElement[] = []; // The status of the carobj, default by the first.
  #statusNow = 0; // Current status.

  constructor(datas: { x: number; y: number }) {
    super();
    this.x = datas.x;
    this.y = datas.y;
  }

  /**
   * Delete one of status.
   * @param index The index of the status.
   */
  deleteStatus(index: number) {
    delete this.#status[index];
  }

  /**
   * Set the status.
   * @param dis[0] The image of all status.
   * @param dis[1] The index of all status,Non-required.
   */
  setStatus(dis: HTMLImageElement, index?: number) {
    if (typeof index === "undefined") {
      this.#status.push(dis);
    } else {
      this.#status[index] = dis;
    }
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    ctx.drawImage(this.#status[this.#statusNow], 0, 0);
    return ctx;
  }

  set status(value: number) {
    this.#statusNow = value;
    // console.log(`Change to ${this.#statusNow}`);
  }

  get status() {
    return this.#statusNow;
  }

  get length() {
    return this.#status.length;
  }

  get sigh() {
    return "Spirit";
  }
}
