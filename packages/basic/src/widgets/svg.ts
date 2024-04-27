import type { WidgetOptions, WidgetStyle } from '@newcar/core'
import { Widget } from '@newcar/core'
import type { Canvas, CanvasKit, Image, Paint } from 'canvaskit-wasm'

function svg2Blob(xml: string): Blob {
  return new Blob([xml], { type: 'image/svg+xml' })
}

// wraps a given string of SVG in an SVG element with optional width and height attributes.
function wrappedSvg(svg: string, width?: number, height?: number): string {
  return `<${[
    'svg',
    `xmlns="http://www.w3.org/2000/svg"`,
    width && `width="${width}"`,
    height && `height="${height}"`,
  ]
    .filter(Boolean) // If the width or height is zero, discard it.
    .join(' ')}>${svg}</svg>`
}

function resolve(svg: string, width?: number, height?: number): string {
  return window.URL.createObjectURL(svg2Blob(wrappedSvg(svg, width, height)))
}

export interface SvgOptions extends WidgetOptions {
  style?: SvgStyle
}

export interface SvgStyle extends WidgetStyle {
  width?: number
  height?: number
}

export class Svg extends Widget {
  declare style: SvgStyle
  private paint: Paint
  private image: HTMLImageElement = document.createElement('img')
  ready = false
  private vcanvas: OffscreenCanvas
  private vcanvasContext: OffscreenCanvasRenderingContext2D
  private imageData: Image

  constructor(public svg: string, options?: SvgOptions) {
    options ??= {}
    super(options)
    options.style ??= {}
    this.style.width = options.style.width ?? 200
    this.style.height = options.style.height ?? 200
    this.vcanvas = new OffscreenCanvas(this.style.width, this.style.height)
    this.vcanvasContext = this.vcanvas.getContext('2d')
  }

  init(ck: CanvasKit) {
    this.image.src = resolve(this.svg, this.style.width, this.style.height)

    this.image.onload = () => {
      this.vcanvasContext.clearRect(0, 0, this.style.width, this.style.height)
      this.vcanvasContext.drawImage(this.image, 0, 0)
      try {
        this.imageData = ck.MakeImageFromCanvasImageSource(this.vcanvas)
      }
      catch {}
      this.ready = true
    }
  }

  predraw(ck: CanvasKit, propertyChanged: string) {
    if (propertyChanged === 'svg') {
      this.ready = false
      this.init(ck)
    }
  }

  draw(canvas: Canvas): void {
    if (this.ready)
      canvas.drawImage(this.imageData, this.x, this.y)
  }
}
