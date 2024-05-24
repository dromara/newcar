import type { SVGBaseAttributes } from '..'
import type { SVGIntegerValue } from '../../interfaces'
import type { SVGPresentationAttributes } from '../presentation'

export interface SVGGenericCoreAttributes extends SVGBaseAttributes {
  id?: string
  class?: string[]
  style?: SVGPresentationAttributes
  lang?: string
  tabindex?: SVGIntegerValue
}
