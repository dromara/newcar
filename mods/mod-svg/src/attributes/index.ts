import type { SVGAnimationAttributes } from './animation'
import type { SVGFilterAttributes } from './filter'
import type { SVGGenericAttributes } from './generic'
import type { SVGPresentationAttributes } from './presentation'

export interface SVGBaseAttributes {}

export * from './animation'
export * from './filter'
export * from './generic'
export * from './presentation'

export type SVGAttributes = SVGAnimationAttributes & SVGFilterAttributes & SVGGenericAttributes & SVGPresentationAttributes
