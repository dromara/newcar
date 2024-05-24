import type { SVGClockValue } from '../../interfaces'
import type { SVGBaseAttributes } from '../index'

export interface SVGAnimationTimingAttributes extends SVGBaseAttributes {
  begin?: string // To be implemented
  dur?: SVGClockValue | 'indefinite' | 'media'
  end?: string // To be implemented
  min?: SVGClockValue
  max?: SVGClockValue
  restart?: 'always' | 'whenNotActive' | 'never'
  repeatCount?: number | 'indefinite'
  repeatDur?: SVGClockValue | 'indefinite'
  fill?: 'remove' | 'freeze'
}
