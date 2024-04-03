import { $sourcesLoaded, WidgetStyle, preload } from '@newcar/core'
import { ImageWidget, ImageWidgetOptions } from './image-widget'
import { CanvasKit, Canvas, AnimatedImage } from 'canvaskit-wasm'
import { Figure } from './figures/figure'

//wraps a given string of SVG in an SVG element with optional width and height attributes.
const wrappedSvg = (svg: string, width?: number, height?: number): string =>
  `<${[
    'svg',
    `xmlns="http://www.w3.org/2000/svg"`,
    width && `width="${width}"`,
    height && `height="${height}"`,
  ]
    .filter(Boolean) // If the width or height is zero, discard it.
    .join(' ')}>${svg}</svg>`

//converts a SVG defined as a string into an ArrayBuffer which contains binary data
function svg2Array(svg: string, width?: number, height?: number) {
  const svgWrapped = wrappedSvg(svg, width, height)
  const svgString = new TextEncoder().encode(svgWrapped)
  return svgString.buffer
}

export interface SvgOptions extends ImageWidgetOptions {
  svg: String
  style?: SvgStyle
}

export interface SvgStyle extends WidgetStyle {
  width: number
  height: number
}

export class Svg extends Figure {
  private img: any
  declare style: SvgStyle

  constructor(
    public svg: string,
    public width?: number,
    public height?: number,
    options?: SvgOptions,
  ) {
    options ??= { svg }
    super(options)
    this.style ??= { width, height }
  }

  init(ck: CanvasKit): void {
    // Stroke
    this.strokePaint = new ck.Paint()

    // Set the argument of canvaskit-wasm
    this.fillPaint = new ck.Paint()
    this.fillPaint.setStyle(ck.PaintStyle.Fill)
    this.fillPaint
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    switch (propertyChanged) {
      case 'svg' || 'style.width' || 'style.height': {
        const imgData: Uint8Array = new Uint8Array(
          svg2Array(this.svg, this.width, this.height),
        )
        this.img = ck.MakeImageFromEncoded(imgData)
        break
      }
    }
  }

  draw(canvas: Canvas): void {
    canvas.drawImage(this.img, this.x, this.y)
  }
}

