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

  static RED = Color.RGB(255, 0, 0);
  static GREEN = Color.RGB(0, 255, 0);
  static BLUE = Color.RGB(0, 0, 255);
  static WHITE = Color.RGB(255, 255, 255);
  static TRANSPARENT = Color.RGBA(0, 0, 0, 0);
  static GREY = Color.RGB(128, 128, 128);
  // static TRANSGENDER_PINK = Color.RGB(245, 169, 184);
  // static TRANSGENDER_BLUE = Color.RGB(91, 206, 250);
  static YELLOW = Color.RGB(255, 255, 0);
  static CYAN = Color.RGB(0, 255, 255);
  static MAGENTA = Color.RGB(255, 0, 255);
  static BLACK = Color.RGB(0, 0, 0);
}
