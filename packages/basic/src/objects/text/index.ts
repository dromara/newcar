import { Color } from "@newcar/utils";

import { Carobj } from "../Carobj";
import type { carobject } from "../Carobj/input_type";
import type { textobject } from "./input_type";
import type { IFontSize, ITextEditable } from "./interface";

export class Text extends Carobj implements ITextEditable, IFontSize {
  #text: string;
  #size: number;
  #color: Color;
  #fontFamily = "sans-serif";
  #align: CanvasTextAlign = "center";
  #baseline: CanvasTextBaseline = "middle";
  #borderColor: Color | null;
  #borderWidth: number;
  constructor(text: string, data?: textobject & carobject) {
    data = data ?? {};
    super(data);
    this.#text = text;
    typeof data.size === "undefined" ? (this.#size = 20) : (this.#size = data.size);
    typeof data.color === "undefined"
      ? (this.#color = Color.rgb(255, 255, 255))
      : (this.#color = data.color);
    if (typeof data.fontFamily !== "undefined") {
      this.fontFamily = data.fontFamily;
    }
    if (typeof data.align !== "undefined") {
      this.#align = data.align;
    }
    if (typeof data.baseline !== "undefined") {
      this.#baseline = data.baseline;
    }
    this.#borderColor = data.borderColor ?? null;
    this.#borderWidth = data.borderWidth ?? 2;
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    ctx.font = `${this.#size}px ${this.#fontFamily}`;
    ctx.textAlign = this.#align;
    ctx.textBaseline = this.#baseline;
    ctx.fillStyle = this.#color.toString();
    ctx.fillText(this.#text, 0, 0);
    if (this.#borderColor !== null) {
      ctx.lineWidth = this.#borderWidth;
      ctx.strokeStyle = this.#borderColor.toString();
      ctx.strokeText(this.#text, 0, 0);
    }

    return ctx;
  }

  get color() {
    return this.#color;
  }

  set color(value: Color) {
    this.#color = value;
  }

  get fontFamily() {
    return this.#fontFamily;
  }

  set fontFamily(value: string) {
    this.#fontFamily = value;
  }

  get align() {
    return this.#align;
  }

  set align(value: CanvasTextAlign) {
    this.#align = value;
  }

  get baseline() {
    return this.#baseline;
  }

  set baseline(value: CanvasTextBaseline) {
    this.#baseline = value;
  }

  get text() {
    return this.#text;
  }

  set text(value) {
    this.#text = value;
  }

  get size() {
    return this.#size;
  }

  set size(value: number) {
    this.#size = value;
  }
}
