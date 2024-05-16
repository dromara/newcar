import { DEFAULT_APP_CONFIG } from './config'

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

export const config = DEFAULT_APP_CONFIG
