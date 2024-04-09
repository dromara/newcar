import { Svg, SvgOptions, SvgStyle } from "./svg";

export interface WebviewOptions extends SvgOptions {
  style?: WebviewStyle
}

export interface WebviewStyle extends SvgStyle {}