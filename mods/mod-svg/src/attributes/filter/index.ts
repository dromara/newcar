import type { SVGFilterPrimitiveAttributes } from './filterPrimitive'
import type { SVGTransferFunctionAttributes } from './transferFunction'

export * from './filterPrimitive'
export * from './transferFunction'

export type SVGFilterAttributes = SVGFilterPrimitiveAttributes & SVGTransferFunctionAttributes
