import type { Color } from "@newcar/utils";

export interface textobject {
  size?: number;
  color?: Color;
  fontFamily?: string;
  align?: CanvasTextAlign;
  baseline?: CanvasTextBaseline;
  hollow?: Boolean;
}
