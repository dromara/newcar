// A class represents a color.
// Unify the color type for more operations.
export class Color {
  r: number;
  g: number;
  b: number;
  a: number;
  constructor() {
    this.r = 255;
    this.g = 255;
    this.b = 255;
    this.a = 255;
  }

  static rgb(r: number, g: number, b: number) {
    const result = new Color();
    result.r = r;
    result.g = g;
    result.b = b;

    return result;
  }

  static rgba(r: number, g: number, b: number, a: number) {
    const result = new Color();
    result.r = r;
    result.g = g;
    result.b = b;
    result.a = a;

    return result;
  }

  static hsl(h: number, s: number, l: number) {
    const ss = s / 100;
    const ll = l / 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = ss * Math.min(ll, 1 - ll);
    const f = (n: number) => ll - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    return Color.rgb(255 * f(0), 255 * f(8), 255 * f(4));
  }

  static hsla(h: number, s: number, l: number, a: number) {
    const result = Color.hsl(h, s, l);
    result.a = a;

    return result;
  }

  toString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  static RED = Color.rgb(255, 0, 0);
  static GREEN = Color.rgb(0, 255, 0);
  static BLUE = Color.rgb(0, 0, 255);
  static WHITE = Color.rgb(255, 255, 255);
  static TRANSPARENT = Color.rgba(0, 0, 0, 0);
  static TRANSGENDER_PINK = Color.rgb(245, 169, 184);
  static TRANSGENDER_BLUE = Color.rgb(91, 206, 250);
  static YELLOW = Color.rgb(255, 255, 0);
  static CYAN = Color.rgb(0, 255, 255);
  static MAGENTA = Color.rgb(255, 0, 255);
  static BLACK = Color.rgb(0, 0, 0);
}
