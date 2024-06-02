import type { Color } from '../../../packages/utils/src'

export type AnimatableValue = number | number[]

export type SVGAngleValue = number // degrees

export type SVGAnythingValue = string

export type SVGClockValue = string // To be implemented

export type SVGColorValue = Color

export type SVGCoordinateValue = number // Maybe [number, number]

export type SVGFrequencyValue = number // Hz

export type SVGFuncIRIValue = string // To be implemented

export type SVGIntegerValue = number

export type SVGIRIValue = string // To be implemented

export type SVGLengthValue = number // Maybe [number, string]

export type SVGNameValue = string

export type SVGNumberOptionalValue = [number] | [number, number]

export type SVGOpacityValue = number

export type SVGPaintValue = Color | SVGIRIValue

export type SVGPercentageValue = number // Will be mapped to normal number

export type SVGTimeValue = number // s

export type SVGTransformListValue = string // To be implemented

export type SVGURLValue = string // To be implemented

export interface SVGElement {} // temp fix, will be replaced later.
