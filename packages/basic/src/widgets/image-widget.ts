import { Widget, WidgetOptions, WidgetStyle } from '@newcar/core'
import type { Canvas, CanvasKit, Paint, RRect } from 'canvaskit-wasm'
import { Vector2 } from '../utils/vector2';

export interface ImageWidgetOptions extends WidgetOptions {
  style?: ImageWidgetStyle
}

export interface ImageWidgetStyle extends WidgetStyle {
  clipFrom?: Vector2;
  clipTo?: Vector2;
}

export class ImageWidget extends Widget {
  constructor(public src: string, options?: ImageWidgetOptions) {
    options ??= {}
    super(options)
  }

  init(ck: CanvasKit): void {}

  predraw(ck: CanvasKit, propertyChanged: string): void {}

  draw(canvas: Canvas): void {}
}
