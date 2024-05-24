import type { SVGGenericCoreAttributes } from './genericCore'
import type { SVGGenericConditionalProcessingAttributes } from './genericConditionalProcessing'

export * from './genericCore'
export * from './genericConditionalProcessing'

export type SVGGenericAttributes = SVGGenericCoreAttributes & SVGGenericConditionalProcessingAttributes
