import type { WidgetOptions, WidgetStyle } from '@newcar/core'
import { Widget } from '@newcar/core'

export interface AudioPlayerOptions extends WidgetOptions {
  style: AudioPlayerStyle
}

export interface AudioPlayerStyle extends WidgetStyle {}

export interface AudioItem {
  duration: number
  file: ArrayBuffer | number
}

export class AudioPlayer extends Widget {
  private context: AudioContext
  private tracks: Array<AudioTrack>

  constructor(options: AudioPlayerOptions) {
    super(options)

    this.context = new AudioContext()
  }

  play() {
    // TODO
  }

  createTrack(): AudioTrack {
    const result = new AudioTrack(this.context)
    this.tracks.push(result)

    return result
  }
}

export class AudioTrack {
  source: AudioBufferSourceNode
  items: Array<AudioItem> = []

  constructor(context: AudioContext) {
    this.source = context.createBufferSource()
    this.source.connect(this.source.context.destination)
  }

  add(audio: ArrayBuffer | number, duration?: number) {
    this.items.push({
      file: audio,
      duration,
    })
    return this
  }

  play() {
    this.source.start()
  }
}
