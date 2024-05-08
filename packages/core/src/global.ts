import { defineConfig } from './config'

/**
 * The global preloaded sources.
 */
export const $source: {
  fonts: ArrayBuffer[]
  images: ArrayBuffer[]
} = {
  fonts: [],
  images: [],
}

export const config = defineConfig({
  unit: 'frame',
  fps: 60,
})
