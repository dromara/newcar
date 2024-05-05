import type { CarEngine } from '@newcar/core'

declare module 'vue' {
  interface ComponentCustomProperties {
    $carengine: CarEngine
  }
}

export * from 'vue'
