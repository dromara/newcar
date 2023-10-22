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

  override draw(ctx: CanvasRenderingContext2D): void {
    ctx.font = `${this.size}px ${this.fontFamily}`;
    ctx.textAlign = this.align;
    ctx.textBaseline = this.baseline;
    ctx.fillStyle = this.color.toString();
    ctx.fillText(this.text, 0, 0);
    if (this.borderColor) {
      ctx.lineWidth = this.borderWidth;
      ctx.strokeStyle = this.borderColor.toString();
      ctx.strokeText(this.text, 0, 0);
    }
  }
}
