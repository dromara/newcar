import { Color } from "../utils/color";
import type { CarobjOption } from "./carobj";
import { Carobj } from "./carobj";

export interface TextOption extends CarobjOption {
  size?: number;
  color?: Color;
  fontFamily?: string;
  align?: CanvasTextAlign;
  baseline?: CanvasTextBaseline;
  borderColor?: Color;
  borderWidth?: number;
}

export class Text extends Carobj {
  text: string;
  size: number;
  color: Color;
  fontFamily: string;
  align: CanvasTextAlign;
  baseline: CanvasTextBaseline;
  borderColor?: Color;
  borderWidth: number;
  constructor(text: string, options?: TextOption) {
    super((options ??= {}));
    this.text = text;
    this.size = options.size ?? 20;
    this.color = options.color ?? Color.WHITE;
    this.fontFamily = options.fontFamily ?? "sans-serif";
    this.align = options.align ?? "center";
    this.baseline = options.baseline ?? "middle";
    this.borderColor = options.borderColor;
    this.borderWidth = options.borderWidth ?? 2;
  }

  override draw(context: CanvasRenderingContext2D): void {
    context.font = `${this.size}px ${this.fontFamily}`;
    context.textAlign = this.align;
    context.textBaseline = this.baseline;
    context.fillStyle = this.color.toString();
    context.fillText(this.text, 0, 0);
    if (this.borderColor) {
      context.lineWidth = this.borderWidth;
      context.strokeStyle = this.borderColor.toString();
      context.strokeText(this.text, 0, 0);
    }
  }
}
