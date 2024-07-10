import { withHook } from '@newcar/core'
import type { AudioPlayer } from '../../widgets/audio-player'

export function play(audio: ArrayBuffer) {
  let source: AudioBufferSourceNode

  return withHook<AudioPlayer, {
    speed?: number
  }>({
    before({ widget }) {
      source = widget.context.createBufferSource()
      source.buffer = audio
    },
    animate() {},
  })
}
