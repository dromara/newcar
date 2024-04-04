import {
  AsyncWidget,
  AsyncWidgetResponse,
  WidgetOptions,
  WidgetStyle,
} from '@newcar/core'
import { Canvas, CanvasKit, Image, Paint } from 'canvaskit-wasm'

const svg2Blob = (xml: string): Blob =>
  new Blob([xml], { type: 'image/svg+xml' })

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

const solve = (svg: string, width?: number, height?: number): string =>
  window.URL.createObjectURL(svg2Blob(wrappedSvg(svg, width, height)))

export interface SvgOptions extends WidgetOptions {
  style?: SvgStyle
}

export interface SvgStyle extends WidgetStyle {
  width?: number
  height?: number
}

export class Svg extends AsyncWidget {
  declare style: SvgStyle
  private buffer: ArrayBuffer
  private image: Image
  private paint: Paint

  constructor(public svg: string, options?: SvgOptions) {
    options ??= {}
    super(options)
    options.style ??= {}
    this.style.width = options.style.width ?? null
    this.style.height = options.style.height ?? null
  }

  async init(ck: CanvasKit): Promise<AsyncWidgetResponse> {
    try {
      this.paint = new ck.Paint()
      this.image = ck.MakeImageFromEncoded(this.buffer)
      this.paint.setAlphaf(this.style.transparency)
      return {
        status: 'ok',
      }
    } catch {
      return {
        status: 'error',
      }
    }
  }

  async predraw(
    ck: CanvasKit,
    propertyChanged: string,
  ): Promise<AsyncWidgetResponse> {
    switch (propertyChanged) {
      case 'svg':
      case 'style.width':
      case 'style.height': {
        try {
          this.buffer = await svg2Array(
            wrappedSvg(this.svg, this.style.width, this.style.height),
          )
          this.image = ck.MakeImageFromEncoded(this.buffer)
        } catch {
          return {
            status: 'error',
          }
        }
        break
      }
      case 'style.transparency': {
        this.paint.setAlphaf(this.style.transparency)
      }
    }
    return {
      status: 'ok',
    }
  }

  draw(canvas: Canvas): void {
    console.log('3')
    canvas.drawImage(this.image, this.x, this.y, this.paint)
  }
}
