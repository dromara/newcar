import type { Ref, WidgetOptions, WidgetRange, WidgetStyle } from '@newcar/core'
import { Widget, ref } from '@newcar/core'
import type { Canvas, CanvasKit, SkottieAnimation } from 'canvaskit-wasm'

export interface SkottieOptions extends WidgetOptions {
  style?: SkottieStyle
}

export interface SkottieStyle extends WidgetStyle {}

export class Skottie extends Widget {
  skottie: SkottieAnimation
  json: Ref<string>
  width: Ref<number>
  height: Ref<number>
  playing: boolean
  frameCounter = 0

  constructor(json: string, width: number, height: number, options?: SkottieOptions) {
    super(options)
    this.json = ref(json)
    this.width = ref(width)
    this.height = ref(height)
  }

  init(ck: CanvasKit) {
    super.init(ck)
    this.skottie = ck.MakeAnimation(this.json.value)
  }

  draw(canvas: Canvas) {
    super.draw(canvas)
    if (this.playing) {
      this.frameCounter += 1
      this.skottie.seekFrame(this.frameCounter)
      this.skottie.render(canvas, [0, 0, this.width.value, this.height.value])
    }
  }

  play() {
    this.playing = true

    return this
  }

  calculateRange(): WidgetRange {
    return [0, 0, this.width.value, this.height.value]
  }

  calculateIn(x: number, y: number): boolean {
    const range = this.calculateRange()
    return x >= range[0]
      && x <= range[2]
      && y >= range[1]
      && y <= range[3]
  }
}

export * from './use-animation-json'
