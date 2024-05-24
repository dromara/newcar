import type { SVGBaseAttributes } from '..'

export interface SVGTransferFunctionAttributes extends SVGBaseAttributes {
  type?: 'matrix' | 'saturate' | 'hueRotate' | 'luminanceToAlpha'
    | 'identity' | 'table' | 'discrete' | 'linear' | 'gamma'
    | 'fractalNoise' | 'turbulence'
  tableValues?: number[]
  intercept?: number
  amplitude?: number
  exponent?: number
}
