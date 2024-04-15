import { CanvasKit, EmbindEnumEntity } from "canvaskit-wasm";
import { Affinity, AlphaType, BlendMode, BlurStyle, ClipOp, ColorChannel, ColorType, FillType, FilterMode, FontEdging, FontHinting, FontSlant, FontWeight, FontWidth, MipmapMode, PaintStyle, Path1DEffectStyle, PathOp, PlaceholderAlignment, PointMode, RectHeightStyle, RectWidthStyle, StrokeCap, StrokeJoin, TextAlign, TextBaseline, TextDirection, TextHeightBehavior, TileMode, VertexMode } from "./types";

export function str2Affinity(ck: CanvasKit, str: Affinity): EmbindEnumEntity {
  switch (str) {
    case 'upstream': return ck.Affinity.Upstream;
    case 'downstream': return ck.Affinity.Downstream;
    default: throw new Error(`Unknown Affinity: ${str}`);
  }
}

export function str2AlphaType(ck: CanvasKit, str: AlphaType): EmbindEnumEntity {
  switch (str) {
    case 'opaque': return ck.AlphaType.Opaque;
    case 'premul': return ck.AlphaType.Premul;
    case 'unpremul': return ck.AlphaType.Unpremul;
    default: throw new Error(`Unknown AlphaType: ${str}`);
  }
}

export function str2BlendMode(ck: CanvasKit, str: BlendMode): EmbindEnumEntity {
  switch (str) {
    case 'clear': return ck.BlendMode.Clear;
    case 'src': return ck.BlendMode.Src;
    case 'dst': return ck.BlendMode.Dst;
    case 'srcOver': return ck.BlendMode.SrcOver;
    case 'dstOver': return ck.BlendMode.DstOver;
    case 'srcIn': return ck.BlendMode.SrcIn;
    case 'dstIn': return ck.BlendMode.DstIn;
    case 'srcOut': return ck.BlendMode.SrcOut;
    case 'dstOut': return ck.BlendMode.DstOut;
    case 'srcATop': return ck.BlendMode.SrcATop;
    case 'dstATop': return ck.BlendMode.DstATop;
    case 'xor': return ck.BlendMode.Xor;
    case 'plus': return ck.BlendMode.Plus;
    case 'modulate': return ck.BlendMode.Modulate;
    case 'screen': return ck.BlendMode.Screen;
    case 'overlay': return ck.BlendMode.Overlay;
    case 'darken': return ck.BlendMode.Darken;
    case 'lighten': return ck.BlendMode.Lighten;
    case 'colorDodge': return ck.BlendMode.ColorDodge;
    case 'colorBurn': return ck.BlendMode.ColorBurn;
    case 'hardLight': return ck.BlendMode.HardLight;
    case 'softLight': return ck.BlendMode.SoftLight;
    case 'difference': return ck.BlendMode.Difference;
    case 'exclusion': return ck.BlendMode.Exclusion;
    case 'multiply': return ck.BlendMode.Multiply;
    case 'hue': return ck.BlendMode.Hue;
    case 'saturation': return ck.BlendMode.Saturation;
    case 'color': return ck.BlendMode.Color;
    case 'luminosity': return ck.BlendMode.Luminosity;
    default: throw new Error(`Unknown BlendMode: ${str}`);
  }
}

export function str2BlurStyle(ck: CanvasKit, str: BlurStyle): EmbindEnumEntity {
  switch (str) {
    case 'normal': return ck.BlurStyle.Normal;
    case 'solid': return ck.BlurStyle.Solid;
    case 'outer': return ck.BlurStyle.Outer;
    case 'inner': return ck.BlurStyle.Inner;
    default: throw new Error(`Unknown BlurStyle: ${str}`);
  }
}

export function str2ClipOp(ck: CanvasKit, str: ClipOp): EmbindEnumEntity {
  switch (str) {
    case 'difference': return ck.ClipOp.Difference;
    case 'intersect': return ck.ClipOp.Intersect;
    default: throw new Error(`Unknown ClipOp: ${str}`);
  }
}

export function str2ColorChannel(ck: CanvasKit, str: ColorChannel): EmbindEnumEntity {
  switch (str) {
    case 'red': return ck.ColorChannel.Red;
    case 'green': return ck.ColorChannel.Green;
    case 'blue': return ck.ColorChannel.Blue;
    case 'alpha': return ck.ColorChannel.Alpha;
    default: throw new Error(`Unknown ColorChannel: ${str}`);
  }
}

export function str2ColorType(ck: CanvasKit, str: ColorType): EmbindEnumEntity {
  switch (str) {
    case 'alpha_8': return ck.ColorType.Alpha_8;
    case 'rgb_565': return ck.ColorType.RGB_565;
    case 'rgba_8888': return ck.ColorType.RGBA_8888;
    case 'bgra_8888': return ck.ColorType.BGRA_8888;
    case 'rgba_1010102': return ck.ColorType.RGBA_1010102;
    case 'rgb_101010x': return ck.ColorType.RGB_101010x;
    case 'gray_8': return ck.ColorType.Gray_8;
    case 'rgba_f16': return ck.ColorType.RGBA_F16;
    case 'rgba_f32': return ck.ColorType.RGBA_F32;
    default: throw new Error(`Unknown ColorType: ${str}`);
  }
}

export function str2FillType(ck: CanvasKit, str: FillType): EmbindEnumEntity {
  switch (str) {
    case 'winding': return ck.FillType.Winding;
    case 'evenOdd': return ck.FillType.EvenOdd;
    default: throw new Error(`Unknown FillType: ${str}`);
  }
}

export function str2FilterMode(ck: CanvasKit, str: FilterMode): EmbindEnumEntity {
  switch (str) {
    case 'linear': return ck.FilterMode.Linear;
    case 'nearest': return ck.FilterMode.Nearest;
    default: throw new Error(`Unknown FilterMode: ${str}`);
  }
}

export function str2FontEdging(ck: CanvasKit, str: FontEdging): EmbindEnumEntity {
  switch (str) {
    case 'alias': return ck.FontEdging.Alias;
    case 'antiAlias': return ck.FontEdging.AntiAlias;
    case 'subpixelAntiAlias': return ck.FontEdging.SubpixelAntiAlias;
    default: throw new Error(`Unknown FontEdging: ${str}`);
  }
}

export function str2FontHinting(ck: CanvasKit, str: FontHinting): EmbindEnumEntity {
  switch (str) {
    case 'none': return ck.FontHinting.None;
    case 'slight': return ck.FontHinting.Slight;
    case 'normal': return ck.FontHinting.Normal;
    case 'full': return ck.FontHinting.Full;
    default: throw new Error(`Unknown FontHinting: ${str}`);
  }
}

export function str2FontSlant(ck: CanvasKit, str: FontSlant): EmbindEnumEntity {
  switch (str) {
    case 'upright': return ck.FontSlant.Upright;
    case 'italic': return ck.FontSlant.Italic;
    case 'oblique': return ck.FontSlant.Oblique;
    default: throw new Error(`Unknown FontSlant: ${str}`);
  }
}

export function str2FontWeight(ck: CanvasKit, str: FontWeight): EmbindEnumEntity {
  switch (str) {
    case 'invisible': return ck.FontWeight.Invisible;
    case 'thin': return ck.FontWeight.Thin;
    case 'extraLight': return ck.FontWeight.ExtraLight;
    case 'light': return ck.FontWeight.Light;
    case 'normal': return ck.FontWeight.Normal;
    case 'medium': return ck.FontWeight.Medium;
    case 'semiBold': return ck.FontWeight.SemiBold;
    case 'bold': return ck.FontWeight.Bold;
    case 'extraBold': return ck.FontWeight.ExtraBold;
    case 'black': return ck.FontWeight.Black;
    case 'extraBlack': return ck.FontWeight.ExtraBlack;
    default: throw new Error(`Unknown FontWeight: ${str}`);
  }
}

export function str2FontWidth(ck: CanvasKit, str: FontWidth): EmbindEnumEntity {
  switch (str) {
    case 'ultraCondensed': return ck.FontWidth.UltraCondensed;
    case 'extraCondensed': return ck.FontWidth.ExtraCondensed;
    case 'condensed': return ck.FontWidth.Condensed;
    case 'semiCondensed': return ck.FontWidth.SemiCondensed;
    case 'normal': return ck.FontWidth.Normal;
    case 'semiExpanded': return ck.FontWidth.SemiExpanded;
    case 'expanded': return ck.FontWidth.Expanded;
    case 'extraExpanded': return ck.FontWidth.ExtraExpanded;
    case 'ultraExpanded': return ck.FontWidth.UltraExpanded;
    default: throw new Error(`Unknown FontWidth: ${str}`);
  }
}

export function str2MipmapMode(ck: CanvasKit, str: MipmapMode): EmbindEnumEntity {
  switch (str) {
    case 'none': return ck.MipmapMode.None;
    case 'nearest': return ck.MipmapMode.Nearest;
    case 'linear': return ck.MipmapMode.Linear;
    default: throw new Error(`Unknown MipmapMode: ${str}`);
  }
}

export function str2PaintStyle(ck: CanvasKit, str: PaintStyle): EmbindEnumEntity {
  switch (str) {
    case 'fill': return ck.PaintStyle.Fill;
    case 'stroke': return ck.PaintStyle.Stroke;
    default: throw new Error(`Unknown PaintStyle: ${str}`);
  }
}

export function str2PathOp(ck: CanvasKit, str: PathOp): EmbindEnumEntity {
  switch (str) {
    case 'difference': return ck.PathOp.Difference;
    case 'intersect': return ck.PathOp.Intersect;
    case 'union': return ck.PathOp.Union;
    case 'xor': return ck.PathOp.XOR;
    case 'reverseDifference': return ck.PathOp.ReverseDifference;
    default: throw new Error(`Unknown PathOp: ${str}`);
  }
}

export function str2PlaceholderAlignment(ck: CanvasKit, str: PlaceholderAlignment): EmbindEnumEntity {
  switch (str) {
    case 'baseline': return ck.PlaceholderAlignment.Baseline;
    case 'aboveBaseline': return ck.PlaceholderAlignment.AboveBaseline;
    case 'belowBaseline': return ck.PlaceholderAlignment.BelowBaseline;
    case 'top': return ck.PlaceholderAlignment.Top;
    case 'bottom': return ck.PlaceholderAlignment.Bottom;
    case 'middle': return ck.PlaceholderAlignment.Middle;
    default: throw new Error(`Unknown PlaceholderAlignment: ${str}`);
  }
}

export function str2PointMode(ck: CanvasKit, str: PointMode): EmbindEnumEntity {
  switch (str) {
    case 'points': return ck.PointMode.Points;
    case 'lines': return ck.PointMode.Lines;
    case 'polygon': return ck.PointMode.Polygon;
    default: throw new Error(`Unknown PointMode: ${str}`);
  }
}

export function str2RectHeightStyle(ck: CanvasKit, str: RectHeightStyle): EmbindEnumEntity {
  switch (str) {
    case 'tight': return ck.RectHeightStyle.Tight;
    case 'max': return ck.RectHeightStyle.Max;
    case 'includeLineSpacingMiddle': return ck.RectHeightStyle.IncludeLineSpacingMiddle;
    case 'includeLineSpacingTop': return ck.RectHeightStyle.IncludeLineSpacingTop;
    case 'includeLineSpacingBottom': return ck.RectHeightStyle.IncludeLineSpacingBottom;
    case 'strut': return ck.RectHeightStyle.Strut;
    default: throw new Error(`Unknown RectHeightStyle: ${str}`);
  }
}

export function str2RectWidthStyle(ck: CanvasKit, str: RectWidthStyle): EmbindEnumEntity {
  switch (str) {
    case 'tight': return ck.RectWidthStyle.Tight;
    case 'max': return ck.RectWidthStyle.Max;
    default: throw new Error(`Unknown RectWidthStyle: ${str}`);
  }
}

export function str2StrokeCap(ck: CanvasKit, str: StrokeCap): EmbindEnumEntity {
  switch (str) {
    case 'butt': return ck.StrokeCap.Butt;
    case 'round': return ck.StrokeCap.Round;
    case 'square': return ck.StrokeCap.Square;
    default: throw new Error(`Unknown StrokeCap: ${str}`);
  }
}

export function str2StrokeJoin(ck: CanvasKit, str: StrokeJoin): EmbindEnumEntity {
  switch (str) {
    case 'bevel': return ck.StrokeJoin.Bevel;
    case 'miter': return ck.StrokeJoin.Miter;
    case 'round': return ck.StrokeJoin.Round;
    default: throw new Error(`Unknown StrokeJoin: ${str}`);
  }
}

export function str2TextAlign(ck: CanvasKit, str: TextAlign): EmbindEnumEntity {
  switch (str) {
    case 'left': return ck.TextAlign.Left;
    case 'right': return ck.TextAlign.Right;
    case 'center': return ck.TextAlign.Center;
    case 'justify': return ck.TextAlign.Justify;
    case 'start': return ck.TextAlign.Start;
    case 'end': return ck.TextAlign.End;
    default: throw new Error(`Unknown TextAlign: ${str}`);
  }
}

export function str2TextBaseline(ck: CanvasKit, str: TextBaseline): EmbindEnumEntity {
  switch (str) {
    case 'alphabetic': return ck.TextBaseline.Alphabetic;
    case 'ideographic': return ck.TextBaseline.Ideographic;
    default: throw new Error(`Unknown TextBaseline: ${str}`);
  }
}

export function str2TextDirection(ck: CanvasKit, str: TextDirection): EmbindEnumEntity {
  switch (str) {
    case 'ltr': return ck.TextDirection.LTR;
    case 'rtl': return ck.TextDirection.RTL;
    default: throw new Error(`Unknown TextDirection: ${str}`);
  }
}

export function str2TextHeightBehavior(ck: CanvasKit, str: TextHeightBehavior): EmbindEnumEntity {
  switch (str) {
    case 'all': return ck.TextHeightBehavior.All;
    case 'disableFirstAscent': return ck.TextHeightBehavior.DisableFirstAscent;
    case 'disableLastDescent': return ck.TextHeightBehavior.DisableLastDescent;
    case 'disableAll': return ck.TextHeightBehavior.DisableAll;
    default: throw new Error(`Unknown TextHeightBehavior: ${str}`);
  }
}

export function str2TileMode(ck: CanvasKit, str: TileMode): EmbindEnumEntity {
  switch (str) {
    case 'clamp': return ck.TileMode.Clamp;
    case 'decal': return ck.TileMode.Decal;
    case 'mirror': return ck.TileMode.Mirror;
    case 'repeat': return ck.TileMode.Repeat;
    default: throw new Error(`Unknown TileMode: ${str}`);
  }
}

export function str2VertexMode(ck: CanvasKit, str: VertexMode): EmbindEnumEntity {
  switch (str) {
    case 'triangles': return ck.VertexMode.Triangles;
    case 'trianglesStrip': return ck.VertexMode.TrianglesStrip;
    case 'triangleFan': return ck.VertexMode.TriangleFan;
    default: throw new Error(`Unknown VertexMode: ${str}`);
  }
}
