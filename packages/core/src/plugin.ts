import type { Scene } from "./scene"
import type { App } from "./app"
import type { CarEngine } from "./engine"
import { Widget } from "./widget"

export interface CarPlugin {
  name: string

  // On engine level
  beforeCanvasKitLoaded?: (engine: CarEngine) => void
  onCanvasKitLoaded?: (engine: CarEngine) => void

  // On app level
  beforeSurfaceLoaded?: (app: App) => void
  onSurfaceLoaded?: (app: App) => void
  onCheckout?: (scene: Scene) => void
  beforeUpdate?: (elapsed: number) => void
  onPatch?: (elapsed: number, old: Widget, now: Widget) => void
  beforeAnimate?: (elapsed: number) => void
  onAnimate?: (elapsed: number) => void
  afterAnimate?: (elapsed: number) => void
  onUpdate?: (elapsed: number) => void
  afterUpdate?: (elapsed: number) => void
}

export const defineCarPlugin = (plugin: CarPlugin): CarPlugin => plugin
