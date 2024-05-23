export interface SVGCircleItem extends _SVGItem {
  tag: 'circle'
  props: {
    cx?: number
    cy?: number
    r?: number
    fill?: string
    stroke?: string
  }
  children: SVGItem[]
}

export interface SVGRectItem extends _SVGItem {
  tag: 'rect'
  props: {
    x?: number
    y?: number
    width?: number
    height?: number
    fill?: string
    stroke?: string
  }
  children: SVGItem[]
}

export interface SVGLineItem extends _SVGItem {
  tag: 'line'
  props: {
    x1?: number
    y1?: number
    x2?: number
    y2?: number
    stroke?: string
  }
  children: SVGItem[]
}

export type SVGItem = SVGCircleItem | SVGRectItem | SVGLineItem

export type AnimatableValue = number | number[]

export interface SVGProp {}

export interface _SVGItem {
  tag: string
  type?: string
  props: SVGProp
}

export interface SVGBaseAnimationProp extends SVGProp {}

export interface SVGBaseAnimationItem extends _SVGItem {
  type: 'Animation'
  props: SVGBaseAnimationProp
}

export interface SVGAnimationValueProp extends SVGBaseAnimationProp {
  calcMode?: 'discrete' | 'linear' | 'paced' | 'spline'
  values?: string
  keyTimes?: number | number[]
  keySplines?: [number, number, number, number] | [number, number, number, number][]
  from?: AnimatableValue
  to?: AnimatableValue
  by?: AnimatableValue
}

export interface SVGAnimateProp extends SVGAnimationValueProp {
  attributeName?: string
  attributeType?: string
  dur?: string // duration, maybe need transform
  repeatCount?: number
}

export interface SVGAnimateItem extends SVGBaseAnimationItem {
  type: 'Animation'
  props: SVGAnimateProp
}

export interface SVGAnimateMotionProp extends SVGAnimationValueProp {
  keyPoints: number | number[]
}

export interface SVGAnimateMotionItem extends SVGBaseAnimationItem {
  type: 'Animation'
  props: SVGAnimateMotionProp
}
