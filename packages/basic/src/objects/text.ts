import { Color } from "@newcar/utils/src";

import type { Bordered } from "../interfaces";
import type { CarobjOption } from "./carobj";
import { Carobj } from "./carobj";

/**
 * Text options.
 * @param size The font size of the text.
 * @param color The color of the text.
 * @param fontFamily The font of the text.
 * @param align The align of the text.
 * @param baseline The baseline of the text.
 * @param border If enable the border
 * @param borderWidth The border width of the text.
 * @param borderColor The border color of the text.
 * @see CarobjOption
 * @see Text
 */
export interface TextOption extends CarobjOption {
  size?: number;
  fontFamily?: string;
  color?: Color;
  align?: CanvasTextAlign;
  baseline?: CanvasTextBaseline;
  border?: boolean;
  borderWidth?: number;
  borderColor?: Color;
}

export class Text extends Carobj implements Bordered {
  text: string;
  size: number;
  fontFamily: string;
  color: Color;
  align: CanvasTextAlign;
  baseline: CanvasTextBaseline;
  border: boolean;
  borderWidth: number;
  borderColor: Color;

  /**
   * Text object.
   * @param text The content of the text.
   * @param options The options of the object.
   * @see TextOption
   */
  constructor(text: string, options?: TextOption) {
    super((options ??= {}));
    this.text = text;
    this.fontFamily = options.fontFamily ?? "sans-serif";
    this.size = options.size ?? 20;
    this.color = options.color ?? Color.WHITE;
    this.align = options.align ?? "center";
    this.baseline = options.baseline ?? "middle";
    this.border = options.border ?? false;
    this.borderWidth = options.borderWidth ?? 2;
    this.borderColor = options.borderColor ?? Color.WHITE;
  }

  override draw(context: CanvasRenderingContext2D): void {
    context.font = `${this.size}px ${this.fontFamily}`;
    context.fillStyle = this.color.toString();
    context.textAlign = this.align;
    context.textBaseline = this.baseline;
    context.fillText(this.text, 0, 0);
    if (this.border) {
      context.lineWidth = this.borderWidth;
      context.strokeStyle = this.borderColor.toString();
      context.strokeText(this.text, 0, 0);
    }
  }
}
