import type { Color } from '@newcar/utils'
import type { SVGBaseAttributes } from '..'
import type { SVGColorValue, SVGLengthValue, SVGPaintValue, SVGPercentageValue, SVGTransformListValue } from '../../interfaces'

export interface SVGPresentationAttributes extends SVGBaseAttributes {
  alignmentBaseline?: 'auto'
  | 'baseline'
  | 'before-edge'
  | 'text-before-edge'
  | 'middle'
  | 'central'
  | 'after-edge'
  | 'text-after-edge'
  | 'ideographic'
  | 'alphabetic'
  | 'hanging'
  | 'mathematical'
  | 'top'
  | 'center'
  | 'bottom'
  baselineShift?: SVGLengthValue | SVGPercentageValue | 'sub' | 'super'
  clipPath?: string // To be implemented
  clipRule?: 'nonzero' | 'evenodd'
  color?: SVGColorValue
  colorInterpolation?: 'auto' | 'sRGB' | 'linearRGB'
  colorInterpolationFilters?: 'auto' | 'sRGB' | 'linearRGB'
  cursor?: string // To be implemented
  d?: string
  direction?: 'ltr' | 'rtl'
  display?: 'block' | 'inline' // Outside
  | 'flow' | 'flow-root' | 'table' | 'flex' | 'grid' | 'ruby' // Inside
  | 'list-item' // List-item
  | 'table-row-group' | 'table-header-group' | 'table-footer-group' | 'table-row' | 'table-cell' | 'table-column-group' | 'table-column' | 'table-caption'
  | 'ruby-base' | 'ruby-text' | 'ruby-base-container' | 'ruby-text-container' // Internal
  | 'contents' | 'none' // Box
  | 'inline-block' | 'inline-table' | 'inline-flex' | 'inline-grid' // Precomposed
  dominantBaseline?: 'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top'
  fill?: SVGPaintValue
  fillOpacity?: number | SVGPercentageValue
  filter?: string // To be implemented
  floodColor?: SVGColorValue
  floodOpacity?: number | SVGPercentageValue
  fontFamily?: string // To be implemented
  fontSize?: SVGLengthValue | SVGPercentageValue
  fontSizeAdjust?: number
  fontStretch?: 'normal'
  | 'semi-condensed' | 'condensed' | 'extra-condensed' | 'ultra-condensed'
  | 'semi-expanded' | 'expanded' | 'extra-expanded' | 'ultra-expanded' | SVGPercentageValue // 50% - 200%
  fontStyle?: 'normal' | 'italic' | 'oblique'
  fontVariant?: string // To be implemented
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number
  imageRendering?: 'auto' | 'optimizeSpeed' | 'optimizeQuality'
  letterSpacing?: 'normal' | SVGLengthValue
  lightingColor?: SVGColorValue
  markerEnd?: string // To be implemented
  markerMid?: string // To be implemented
  markerStart?: string // To be implemented
  mask?: string // To be implemented
  opacity?: number | SVGPercentageValue
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto'
  pointerEvents?: 'bounding-box' | 'visiblePainted' | 'visibleFill' | 'visibleStroke' | 'visible' | 'painted' | 'fill' | 'stroke' | 'all' | 'none'
  shapeRendering?: 'auto' | 'optimizeSpeed' | 'crispEdges' | 'geometricPrecision'
  stopColor?: 'currentcolor' | SVGColorValue
  stopOpacity?: number | SVGPercentageValue
  stroke?: SVGPaintValue
  strokeDasharray?: 'none' | (SVGLengthValue | SVGPercentageValue)[]
  strokeDashoffset?: SVGLengthValue | SVGPercentageValue
  strokeLinecap?: 'butt' | 'round' | 'square'
  strokeLinejoin?: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round'
  strokeMiterlimit?: number
  strokeOpacity?: number | SVGPercentageValue
  strokeWidth?: SVGLengthValue | SVGPercentageValue
  textAnchor?: 'start' | 'middle' | 'end'
  textDecoration?: string // To be implemented
  textRendering?: 'auto' | 'optimizeSpeed' | 'optimizeLegibility' | 'geometricPrecision'
  transform?: SVGTransformListValue
  transformOrigin?: string // To be implemented
  unicodeBidi?: 'normal' | 'embed' | 'bidi-override' | 'isolate' | 'isolate-override' | 'plaintext'
  vectorEffect?: 'none' | 'non-scaling-stroke' | 'non-scaling-size' | 'non-rotation' | 'fixed-position'
  visibility?: 'visible' | 'hidden' | 'collapse'
  wordSpacing?: 'normal' | SVGLengthValue
  writingMode?: 'horizontal-tb' | 'vertical-rl' | 'vertical-lr'
}
