import { Color } from "@newcar/utils";

import type { CarObjectOption } from "./carobj";
import { CarObject } from "./carobj";
import type { Bordered } from "./interfaces";

/**
 * The text options.
 * @param size The font size of the text.
 * @param color The color of the text.
 * @param font The font of the text.
 * @param align The align of the text.
 * @param baseline The baseline of the text.
 * @see CarObjectOption
 * @see Bordered
 * @see Text
 */
export interface TextOption extends CarObjectOption, Bordered {
  size?: number;
  font?: string;
  color?: Color;
  align?: CanvasTextAlign;
  baseline?: CanvasTextBaseline;
}

/**
 * The text object.
 */
export class Text extends CarObject implements TextOption {
  text: string;
  size: number;
  font: string;
  color: Color;
  align: CanvasTextAlign;
  baseline: CanvasTextBaseline;
  borderWidth: number;
  borderColor: Color;

  /**
   * @param text The content of the text.
   * @param options The options of the object.
   * @see TextOption
   */
  constructor(text: string, options?: TextOption) {
    super((options ??= {}));
    this.text = text;
    this.font = options.font ?? "sans-serif";
    this.size = options.size ?? 20;
    this.color = options.color ?? Color.WHITE;
    this.align = options.align ?? "center";
    this.baseline = options.baseline ?? "middle";
    this.borderWidth = options.borderWidth ?? 0;
    this.borderColor = options.borderColor ?? Color.WHITE;
  }

  override draw(context: CanvasRenderingContext2D): void {
    context.font = `${this.size}px ${this.font}`;
    context.fillStyle = this.color.toString();
    context.textAlign = this.align;
    context.textBaseline = this.baseline;
    context.fillText(
      this.text.slice(0, Math.round(this.progress * this.text.length)),
      0,
      0,
    );
    if (this.borderWidth) {
      context.lineWidth = this.borderWidth;
      context.strokeStyle = this.borderColor.toString();
      context.strokeText(this.text, 0, 0);
    }
  }
}
