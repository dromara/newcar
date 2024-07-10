import type { WidgetOptions, WidgetStyle } from '@newcar/core'
import { Widget } from '@newcar/core'

export interface AudioPlayerOptions extends WidgetOptions {
  style?: WidgetStyle
}

export class AudioPlayer extends Widget {
  context: AudioContext = new AudioContext()

  constructor(options?: AudioPlayerOptions) {
    super(options)
  }
}
