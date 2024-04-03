import type { Scene } from "./scene"
import type { App } from "./app"
import type { CarEngine } from "./engine"
import type { Widget } from "./widget"
import type { Surface } from "canvaskit-wasm"

export interface CarPlugin {
  name: string

  // On engine level
  beforeCanvasKitLoaded?: (engine: CarEngine) => void
  onCanvasKitLoaded?: (engine: CarEngine) => void

  // On app level
  beforeSurfaceLoaded?: (app: App) => void
  onSurfaceLoaded?: (app: App, surface: Surface) => void
  beforeCheckout?: (app: App, scene: Scene) => void
  onCheckout?: (app: App, scene: Scene) => void
  beforeUpdate?: (app: App, elapsed: number) => void
  beforePatch?: (app: App, elapsed: number, old: Widget, now: Widget) => void
  afterPatch?: (app: App, elapsed: number, old: Widget, now: Widget) => void
  // beforeAnimate?: (app: App, elapsed: number) => void
  // onAnimate?: (app: App, elapsed: number, widget: Widget) => void
  // afterAnimate?: (app: App, elapsed: number, widget: Widget) => void
  afterUpdate?: (app: App, elapsed: number) => void
}

export const defineCarPlugin = (plugin: CarPlugin): CarPlugin => plugin
