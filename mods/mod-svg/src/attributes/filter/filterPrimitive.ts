import type { SVGBaseAttributes } from '..'
import type { SVGLengthValue, SVGPercentageValue } from '../../interfaces'
import type { SVGPresentationAttributes } from '../presentation'

export interface SVGFilterPrimitiveAttributes extends SVGBaseAttributes {
  height?: 'auto' | SVGLengthValue | SVGPercentageValue
  width?: 'auto' | SVGLengthValue | SVGPercentageValue
  result?: string // To be implemented
  x?: SVGLengthValue | SVGPercentageValue | number | (SVGLengthValue | SVGPercentageValue)[]
  y?: SVGLengthValue | SVGPercentageValue | number | (SVGLengthValue | SVGPercentageValue)[]
}
