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

  toString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }
}
