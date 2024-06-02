import type { CanvasKit, Shader as ckShader } from 'canvaskit-wasm'
import type { Color } from './color'
import type { BlendMode, TileMode } from './types'
import { str2BlendMode, str2TileMode } from './trans'

export interface BlendShaderOptions {
  mode: BlendMode
  one: Shader
  two: Shader
  type: 'blend'
}

export interface ColorShaderOptions {
  color: Color
  type: 'color'
}

export interface FractalNoiseShaderOptions {
  baseFreqX: number
  baseFreqY: number
  octaves: number
  seed: number
  tileW: number
  tileH: number
  type: 'fractal'
}

export interface LinearGradientShaderOptions {
  start: [number, number]
  end: [number, number]
  colors: Color[]
  pos: null | number[]
  mode: TileMode
  type: 'linear'
}

export interface RadialGradientShaderOptions {
  center: [number, number]
  radius: number
  colors: Color[]
  pos: null | number[]
  mode: TileMode
  type: 'radial'
}

export interface SweepGradientShaderOptions {
  cx: number
  cy: number
  colors: Color[]
  pos: null | number[]
  mode: TileMode
  type: 'sweep'
}

export interface TurbulenceShaderOptions {
  baseFreqX: number
  baseFreqY: number
  octaves: number
  seed: number
  tileW: number
  tileH: number
  type: 'turbulence'
}

export interface TwoPointConicalGradientShaderOptions {
  start: [number, number]
  startRadius: number
  end: [number, number]
  endRadius: number
  colors: Color[]
  pos: null | number[]
  mode: TileMode
  type: 'twoPointConical'
}

export type ShaderOptions =
  BlendShaderOptions
  | ColorShaderOptions
  | FractalNoiseShaderOptions
  | LinearGradientShaderOptions
  | RadialGradientShaderOptions
  | SweepGradientShaderOptions
  | TurbulenceShaderOptions
  | TwoPointConicalGradientShaderOptions

export class Shader {
  constructor(public shaderOptions: ShaderOptions) { }

  toCanvasKitShader(ck: CanvasKit): ckShader {
    switch (this.shaderOptions.type) {
      case 'blend': return ck.Shader.MakeBlend(
        str2BlendMode(ck, this.shaderOptions.mode),
        this.shaderOptions.one.toCanvasKitShader(ck),
        this.shaderOptions.two.toCanvasKitShader(ck),
      )
      case 'color': return ck.Shader.MakeColor(
        this.shaderOptions.color.toFloat4(),
        ck.ColorSpace.ADOBE_RGB,
      )
      case 'fractal': return ck.Shader.MakeFractalNoise(
        this.shaderOptions.baseFreqX,
        this.shaderOptions.baseFreqY,
        this.shaderOptions.octaves,
        this.shaderOptions.seed,
        this.shaderOptions.tileW,
        this.shaderOptions.tileH,
      )
      case 'linear': return ck.Shader.MakeLinearGradient(
        this.shaderOptions.start,
        this.shaderOptions.end,
        this.shaderOptions.colors.map(color => color.toFloat4()),
        this.shaderOptions.pos,
        str2TileMode(ck, this.shaderOptions.mode),
      )
      case 'radial': return ck.Shader.MakeRadialGradient(
        this.shaderOptions.center,
        this.shaderOptions.radius,
        this.shaderOptions.colors.map(color => color.toFloat4()),
        this.shaderOptions.pos,
        str2TileMode(ck, this.shaderOptions.mode),
      )
      case 'sweep': return ck.Shader.MakeSweepGradient(
        this.shaderOptions.cx,
        this.shaderOptions.cy,
        this.shaderOptions.colors.map(color => color.toFloat4()),
        this.shaderOptions.pos,
        str2TileMode(ck, this.shaderOptions.mode),
      )
      case 'turbulence': return ck.Shader.MakeTurbulence(
        this.shaderOptions.baseFreqX,
        this.shaderOptions.baseFreqY,
        this.shaderOptions.octaves,
        this.shaderOptions.seed,
        this.shaderOptions.tileW,
        this.shaderOptions.tileH,
      )
      case 'twoPointConical': return ck.Shader.MakeTwoPointConicalGradient(
        this.shaderOptions.start,
        this.shaderOptions.startRadius,
        this.shaderOptions.end,
        this.shaderOptions.endRadius,
        this.shaderOptions.colors.map(color => color.toFloat4()),
        this.shaderOptions.pos,
        str2TileMode(ck, this.shaderOptions.mode),
      )
    }
  }

  static createBlendShader(
    mode: BlendMode,
    one: Shader,
    two: Shader,
  ) {
    return new Shader({
      type: 'blend',
      mode,
      one,
      two,
    })
  }

  static createColorShader(color: Color) {
    return new Shader({
      type: 'color',
      color,
    })
  }

  static createFractalNoiseShader(
    baseFreqX: number,
    baseFreqY: number,
    octaves: number,
    seed: number,
    tileW: number,
    tileH: number,
  ) {
    return new Shader({
      type: 'fractal',
      baseFreqX,
      baseFreqY,
      octaves,
      seed,
      tileH,
      tileW,
    })
  }

  static createLinearGradientShader(
    start: [number, number],
    end: [number, number],
    colors: Color[],
    pos: null | number[],
    mode: TileMode,
  ) {
    return new Shader({
      type: 'linear',
      start,
      end,
      colors,
      pos,
      mode,
    })
  }

  static createRadialGradientShader(
    center: [number, number],
    radius: number,
    colors: Color[],
    pos: null | number[],
    mode: TileMode,
  ) {
    return new Shader({
      type: 'radial',
      center,
      radius,
      colors,
      pos,
      mode,
    })
  }

  static createSweepGradientShader(
    cx: number,
    cy: number,
    colors: Color[],
    pos: null | number[],
    mode: TileMode,
  ) {
    return new Shader({
      type: 'sweep',
      cx,
      cy,
      colors,
      pos,
      mode,
    })
  }

  static createTurbulenceShader(
    baseFreqX: number,
    baseFreqY: number,
    octaves: number,
    seed: number,
    tileW: number,
    tileH: number,
  ) {
    return new Shader({
      type: 'turbulence',
      baseFreqX,
      baseFreqY,
      octaves,
      seed,
      tileH,
      tileW,
    })
  }

  static createTwoPointConicalGradientShader(
    start: [number, number],
    startRadius: number,
    end: [number, number],
    endRadius: number,
    colors: Color[],
    pos: null | number[],
    mode: TileMode,
  ) {
    return new Shader({
      type: 'twoPointConical',
      start,
      startRadius,
      end,
      endRadius,
      colors,
      pos,
      mode,
    })
  }
}
