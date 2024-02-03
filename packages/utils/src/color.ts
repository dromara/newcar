export class Color {
  red: number;
  green: number;
  blue: number;
  alpha: number;

  constructor(red?: number, green?: number, blue?: number, alpha?: number) {
    this.red = red ?? 255;
    this.green = green ?? 255;
    this.blue = blue ?? 255;
    this.alpha = alpha ?? 1;
  }

  /**
   * Generate a color by red, green and blue components,
   * whith all the components are between 0 and 255.
   * @param red The RED component.      (0~255)
   * @param green The GREEN component.  (0~255)
   * @param blue The RED component.     (0~255)
   * @returns The color.
   */
  static RGB(red: number, green: number, blue: number): Color {
    return new Color(red, green, blue);
  }

  /**
   * Generate a color by red, green and blue components,
   * whith all the components are between 0 and 1.
   * @param red The RED component.      (0.~1.)
   * @param green The GREEN component.  (0.~1.)
   * @param blue The RED component.     (0.~1.)
   * @returns The color.
   */
  static UnifiedRGB(r: number, g: number, b: number): Color {
    return Color.RGB(r * 255, g * 255, b * 255);
  }

  /**
   * Generate a color by red, green, blue, alpha components,
   * whith color components are between 0 and 255,
   * and the transparent component is between 0 and 1.
   * @param red The RED component.      (0~255)
   * @param green The GREEN component.  (0~255)
   * @param blue The RED component.     (0~255)
   * @param alpha The ALPHA component.  (0.~1.)
   * @returns The color.
   */
  static RGBA(red: number, green: number, blue: number, alpha: number): Color {
    return new Color(red, green, blue, alpha);
  }

  /**
   * Generate a color by red, green, blue and alpha components,
   * whith all the components are between 0 and 1.
   * @param red The RED component.      (0.~1.)
   * @param green The GREEN component.  (0.~1.)
   * @param blue The RED component.     (0.~1.)
   * @param alpha The ALPHA component.  (0.~1.)
   * @returns The color.
   */
  static UnifiedRGBA(
    red: number,
    green: number,
    blue: number,
    alpha: number,
  ): Color {
    return Color.RGBA(red * 255, green * 255, blue * 255, alpha);
  }

  /**
   * Generate a color by hue, saturation, lightness components,
   * whith the hue component is between 0 and 360,
   * and the saturation and lightness components are between 0 and 100.
   * @param hue The HUE component.                (0~360)
   * @param saturation The SATURATION component.  (0~100)
   * @param lightness The LIGHTNESS component.    (0~100)
   * @returns The color.
   */
  static HSL(hue: number, saturation: number, lightness: number): Color {
    saturation /= 100;
    lightness /= 100;
    const a = saturation * Math.min(lightness, 1 - lightness);
    function f(n: number): number {
      const k = (n + hue / 30) % 12;

      return lightness - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    }

    return Color.UnifiedRGB(f(0), f(8), f(4));
  }

  /**
   * Generate a color by hue, saturation, lightness components,
   * whith all the components are between 0 and 1.
   * @param hue The HUE component.                (0.~1.)
   * @param saturation The SATURATION component.  (0.~1.)
   * @param lightness The LIGHTNESS component.    (0.~1.)
   * @returns The color.
   */
  static UnifiedHSL(hue: number, saturation: number, lightness: number): Color {
    return Color.HSL(hue * 360, saturation * 100, lightness * 100);
  }

  /**
   * Generate a color by hue, saturation, lightness components,
   * whith the hue component is between 0 and 360,
   * and the saturation and lightness components are between 0 and 100,
   * and the alpha component is between 0 and 1.
   * @param hue The HUE component.                (0~360)
   * @param saturation The SATURATION component.  (0~100)
   * @param lightness The LIGHTNESS component.    (0~100)
   * @param alpha The ALPHA component.            (0.~1.)
   * @returns The color.
   */
  static HSLA(h: number, s: number, l: number, alpha: number): Color {
    const color = Color.HSL(h, s, l);
    color.alpha = alpha;

    return color;
  }

  /**
   * Generate a color by hue, saturation, lightness components,
   * whith all the components are between 0 and 1.
   * @param h The HUE component.        (0.~1.)
   * @param s The SATURATION component. (0.~1.)
   * @param l The LIGHTNESS component.  (0.~1.)
   * @param a The ALPHA component.      (0.~1.)
   * @returns The color.
   */
  static UnifiedHSLA(h: number, s: number, l: number, a: number): Color {
    return Color.HSLA(h * 360, s * 100, l * 100, a);
  }

  /**
   * Get the string for this color in RGBA format.
   * @returns A string like `rgba(r, g, b, a)`.
   */
  toString(): string {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
  }

  static ALICEBLUE = Color.RGB(240, 248, 255);
  static ANTIQUEWHITE = Color.RGB(250, 235, 215);
  static AQUA = Color.RGB(0, 255, 255);
  static AQUAMARINE = Color.RGB(127, 255, 212);
  static AZURE = Color.RGB(240, 255, 255);
  static BEIGE = Color.RGB(245, 245, 220);
  static BISQUE = Color.RGB(255, 228, 196);
  static BLACK = Color.RGB(0, 0, 0);
  static BLANCHEDALMOND = Color.RGB(255, 235, 205);
  static BLUE = Color.RGB(0, 0, 255);
  static BLUEVIOLET = Color.RGB(138, 43, 226);
  static BROWN = Color.RGB(165, 42, 42);
  static BURLYWOOD = Color.RGB(222, 184, 135);
  static CADETBLUE = Color.RGB(95, 158, 160);
  static CHARTREUSE = Color.RGB(127, 255, 0);
  static CHOCOLATE = Color.RGB(210, 105, 30);
  static CORAL = Color.RGB(255, 127, 80);
  static CORNFLOWERBLUE = Color.RGB(100, 149, 237);
  static CORNSILK = Color.RGB(255, 248, 220);
  static CRIMSON = Color.RGB(220, 20, 60);
  static CYAN = Color.RGB(0, 255, 255);
  static DARKBLUE = Color.RGB(0, 0, 139);
  static DARKCYAN = Color.RGB(0, 139, 139);
  static DARKGOLDENROD = Color.RGB(184, 134, 11);
  static DARKGRAY = Color.RGB(169, 169, 169);
  static DARKGREEN = Color.RGB(0, 100, 0);
  static DARKGREY = Color.RGB(169, 169, 169);
  static DARKKHAKI = Color.RGB(189, 183, 107);
  static DARKMAGENTA = Color.RGB(139, 0, 139);
  static DARKOLIVEGREEN = Color.RGB(85, 107, 47);
  static DARKORANGE = Color.RGB(255, 140, 0);
  static DARKORCHID = Color.RGB(153, 50, 204);
  static DARKRED = Color.RGB(139, 0, 0);
  static DARKSALMON = Color.RGB(233, 150, 122);
  static DARKSEAGREEN = Color.RGB(143, 188, 143);
  static DARKSLATEBLUE = Color.RGB(72, 61, 139);
  static DARKSLATEGRAY = Color.RGB(47, 79, 79);
  static DARKSLATEGREY = Color.RGB(47, 79, 79);
  static DARKTURQUOISE = Color.RGB(0, 206, 209);
  static DARKVIOLET = Color.RGB(148, 0, 211);
  static DEEPPINK = Color.RGB(255, 20, 147);
  static DEEPSKYBLUE = Color.RGB(0, 191, 255);
  static DIMGRAY = Color.RGB(105, 105, 105);
  static DIMGREY = Color.RGB(105, 105, 105);
  static DODGERBLUE = Color.RGB(30, 144, 255);
  static FIREBRICK = Color.RGB(178, 34, 34);
  static FLORALWHITE = Color.RGB(255, 250, 240);
  static FORESTGREEN = Color.RGB(34, 139, 34);
  static FUCHSIA = Color.RGB(255, 0, 255);
  static GAINSBORO = Color.RGB(220, 220, 220);
  static GHOSTWHITE = Color.RGB(248, 248, 255);
  static GOLD = Color.RGB(255, 215, 0);
  static GOLDENROD = Color.RGB(218, 165, 32);
  static GRAY = Color.RGB(128, 128, 128);
  static GREEN = Color.RGB(0, 128, 0);
  static GREENYELLOW = Color.RGB(173, 255, 47);
  static HONEYDEW = Color.RGB(240, 255, 240);
  static HOTPINK = Color.RGB(255, 105, 180);
  static IVORY = Color.RGB(255, 255, 240);
  static INDIGO = Color.RGB(75, 0, 130);
  static INDIANRED = Color.RGB(205, 92, 92);
  static KHAKI = Color.RGB(240, 230, 140);
  static LAVENDER = Color.RGB(230, 230, 250);
  static LAVENDERBLUSH = Color.RGB(255, 240, 245);
  static LAWNGREEN = Color.RGB(124, 252, 0);
  static LEMONCHIFFON = Color.RGB(255, 250, 205);
  static LIGHTBLUE = Color.RGB(173, 216, 230);
  static LIGHTCORAL = Color.RGB(240, 128, 128);
  static LIGHTCYAN = Color.RGB(224, 255, 255);
  static LIGHTGOLDENRODYELLOW = Color.RGB(250, 250, 210);
  static LIGHTGRAY = Color.RGB(211, 211, 211);
  static LIGHTGREEN = Color.RGB(144, 238, 144);
  static LIGHTGREY = Color.RGB(211, 211, 211);
  static LIGHTPINK = Color.RGB(255, 182, 193);
  static LIGHTSALMON = Color.RGB(255, 160, 122);
  static LIGHTSEAGREEN = Color.RGB(32, 178, 170);
  static LIGHTSKYBLUE = Color.RGB(135, 206, 250);
  static LIGHTSLATEGRAY = Color.RGB(119, 136, 153);
  static LIGHTSLATEGREY = Color.RGB(119, 136, 153);
  static LIGHTSTEELBLUE = Color.RGB(176, 196, 222);
  static LIGHTYELLOW = Color.RGB(255, 255, 224);
  static LIME = Color.RGB(0, 255, 0);
  static LIMEGREEN = Color.RGB(50, 205, 50);
  static LINEN = Color.RGB(250, 240, 230);
  static NAVAJOWHITE = Color.RGB(255, 222, 173);
  static NAVY = Color.RGB(0, 0, 128);
  static OLDLACE = Color.RGB(253, 245, 230);
  static OLIVE = Color.RGB(128, 128, 0);
  static OLIVEDRAB = Color.RGB(107, 142, 35);
  static ORANGE = Color.RGB(255, 165, 0);
  static ORANGERED = Color.RGB(255, 69, 0);
  static ORCHID = Color.RGB(218, 112, 214);
  static PALEGOLDENROD = Color.RGB(238, 232, 170);
  static PALEGREEN = Color.RGB(152, 251, 152);
  static PALETURQUOISE = Color.RGB(175, 238, 238);
  static PALEVIOLETRED = Color.RGB(219, 112, 147);
  static PAPAYAWHIP = Color.RGB(255, 239, 213);
  static PEACHPUFF = Color.RGB(255, 218, 185);
  static PERU = Color.RGB(205, 133, 63);
  static PINK = Color.RGB(255, 192, 203);
  static PLUM = Color.RGB(221, 160, 221);
  static POWDERBLUE = Color.RGB(176, 224, 230);
  static PURPLE = Color.RGB(128, 0, 128);
  static REBECCAPURPLE = Color.RGB(102, 51, 153);
  static RED = Color.RGB(255, 0, 0);
  static ROSYBROWN = Color.RGB(188, 143, 143);
  static ROYALBLUE = Color.RGB(65, 105, 225);
  static SADDLEBROWN = Color.RGB(139, 69, 19);
  static SALMON = Color.RGB(250, 128, 114);
  static SANDYBROWN = Color.RGB(244, 164, 96);
  static SEAGREEN = Color.RGB(46, 139, 87);
  static SEASHELL = Color.RGB(255, 245, 238);
  static SIENNA = Color.RGB(160, 82, 45);
  static SILVER = Color.RGB(192, 192, 192);
  static SKYBLUE = Color.RGB(135, 206, 235);
  static SLATEBLUE = Color.RGB(106, 90, 205);
  static SLATEGRAY = Color.RGB(112, 128, 144);
  static SLATEGREY = Color.RGB(112, 128, 144);
  static SNOW = Color.RGB(255, 250, 250);
  static SPRINGGREEN = Color.RGB(0, 255, 127);
  static STEELBLUE = Color.RGB(70, 130, 180);
  static TAN = Color.RGB(210, 180, 140);
  static TEAL = Color.RGB(0, 128, 128);
  static THISTLE = Color.RGB(216, 191, 216);
  static TOMATO = Color.RGB(255, 99, 71);
  static TURQUOISE = Color.RGB(64, 224, 208);
  static VIOLET = Color.RGB(238, 130, 238);
  static WHEAT = Color.RGB(245, 222, 179);
  static WHITE = Color.RGB(255, 255, 255);
  static WHITESMOKE = Color.RGB(245, 245, 245);
  static YELLOW = Color.RGB(255, 255, 0);
  static YELLOWGREEN = Color.RGB(154, 205, 50);
}
