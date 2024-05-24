import type { SVGBaseAttributes } from '..'
import type { SVGLengthValue, SVGPercentageValue } from '../../interfaces'
import type { SVGPresentationAttributes } from '../presentation'

export interface SVGTransferFunctionAttributes extends SVGBaseAttributes {
  type?: 'matrix' | 'saturate' | 'hueRotate' | 'luminanceToAlpha'
    | 'identity' | 'table' | 'discrete' | 'linear' | 'gamma'
    | 'fractalNoise' | 'turbulence'
  tableValues?: number[]
  intercept?: number
  amplitude?: number
  exponent?: number
}
