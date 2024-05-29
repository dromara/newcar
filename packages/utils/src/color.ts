import { colorParsley, colorToHex, colorToRGB } from 'colorparsley'

export type ColorRgba = [r: number, g: number, b: number, alpha: number]

export class Color {
  private constructor(
    readonly red: number,
    readonly green: number,
    readonly blue: number,
    readonly alpha: number = 1,
  ) {}

  withAlpha(newAlpha: number): Color {
    return Color.rgba(this.red, this.green, this.blue, newAlpha)
  }

  toArray(): ColorRgba {
    return [this.red, this.green, this.blue, this.alpha]
  }

  toArrayFloat(): ColorRgba {
    return [this.red / 255, this.green / 255, this.blue / 255, this.alpha]
  }

  toFloat4(): Float32Array {
    return new Float32Array(this.toArrayFloat())
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
  static rgba(red: number, green: number, blue: number, alpha?: number): Color {
    return new Color(red, green, blue, alpha)
  }

  /**
   * Generate a color by red, green and blue components,
   * whith all the components are between 0 and 1.
   * @param red The RED component.      (0.~1.)
   * @param green The GREEN component.  (0.~1.)
   * @param blue The RED component.     (0.~1.)
   * @param alpha The ALPHA component.  (0.~1.)
   * @returns The color.
   */
  static rgbaFloat(red: number, green: number, blue: number, alpha?: number): Color {
    return Color.rgba(red * 255, green * 255, blue * 255, alpha)
  }

  /**
   * Generate a color by hue, saturation, lightness components,
   * whith the hue component is between 0 and 360,
   * and the saturation and lightness components are between 0 and 100.
   * @param hue The HUE component.                (0~360)
   * @param saturation The SATURATION component.  (0~100)
   * @param lightness The LIGHTNESS component.    (0~100)
   * @param alpha The ALPHA component.            (0.~1.)
   * @returns The color.
   */
  static hsla(
    hue: number,
    saturation: number,
    lightness: number,
    alpha?: number,
  ): Color {
    saturation /= 100
    lightness /= 100
    const a = saturation * Math.min(lightness, 1 - lightness)
    function f(n: number): number {
      const k = (n + hue / 30) % 12

      return lightness - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
    }

    return Color.rgba(f(0), f(8), f(4), alpha)
  }

  /**
   * Generate a color by hue, saturation, lightness components,
   * @param h The HUE component.        (0~360)
   * @param s The SATURATION component. (0.~1.)
   * @param l The LIGHTNESS component.  (0.~1.)
   * @param a The ALPHA component.      (0.~1.)
   * @returns The color.
   */
  static hslaFloat(h: number, s: number, l: number, a: number): Color {
    return Color.hsla(h, s * 100, l * 100, a)
  }

  /**
   *
   * @returns color string
   */
  toString(): string {
    return this.toRgba()
  }

  /**
   * Get the string for this color in RGBA format.
   * @param[round=false] All the color values will be rounded to the nearest integer.
   * @returns A string like `rgba(r, g, b, a)`.
   */
  toRgba(round = false): string {
    return colorToRGB([this.red, this.green, this.blue, this.alpha], round)
  }

  /**
   * Get the string for this color in RGBA Hex format.
   * @param [allow3] Allow to generate `#rgb` instead of `#rrggbb`
   * @returns A string like `#ffffff` or `#ffffffff`.
   */
  toHex(allow3 = false): string {
    return colorToHex([this.red, this.green, this.blue, this.alpha], allow3)
  }

  /**
   * Generate a color by CSS-like color string.
   * @param cssInput CSS-like color string.
   * @example `hsl(180 55% 25% / 10%)`, `rgb(255 122 111)`, `darkcyan`
   * @returns The color.
   */
  static parse(cssInput: string): Color {
    const [r, g, b, a, v, s] = colorParsley(cssInput)

    if (!v || s !== 'sRGB')
      throw new TypeError(`${cssInput} is an invalid color string`)

    return new Color(r, g, b, a)
  }

  static readonly WHITE = Color.rgba(255, 255, 255)
  static readonly BLACK = Color.rgba(0, 0, 0)
  static readonly TRANSPARENT = Color.rgba(0, 0, 0, 0)
}
