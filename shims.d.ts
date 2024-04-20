declare module 'colorparsley' {
  export type ParseOutput = [
    r: number,
    g: number,
    b: number,
    alpha: number,
    isValid: boolean,
    colorspace: string,
  ]
  export function colorParsley(input: string): ParseOutput

  export type ColorRgba = [r: number, g: number, b: number, alpha?: number]
  export function colorToHex(rgba?: ColorRgba, allow3?: boolean): string
  export function colorToRGB(rgba?: ColorRgba, round?: boolean): string
}
