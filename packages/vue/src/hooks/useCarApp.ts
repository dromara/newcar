import type { App, CarEngine, Scene } from '@newcar/core'
import { type Ref, inject, onMounted, ref, watchEffect } from 'vue'

export function useCarApp(scene: Scene) {
  const canvas: Ref<HTMLCanvasElement> = ref(null)
  let app: App
  const engine = inject<CarEngine>('carengine')

  const getApp = () => {
    if (!app && engine) {
      app = engine.createApp(canvas.value)
      app.checkout(scene)
    }
    return app
  }

  watchEffect(() => {
    if (engine)
      getApp()
  })

  return {
    canvas,
    app,
  }
}
