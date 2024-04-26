import type { Surface } from 'canvaskit-wasm'
import type { Scene } from './scene'
import type { App } from './app'
import type { LocalApp } from './localApp'
import type { CarEngine } from './engine'
import type { Widget } from './widget'

export interface CarPlugin {
  name: string

  // On engine level
  beforeCanvasKitLoaded?: (engine: CarEngine) => void
  onCanvasKitLoaded?: (engine: CarEngine) => void

  // On app level
  beforeSurfaceLoaded?: (app: App | LocalApp) => void
  onSurfaceLoaded?: (app: App | LocalApp, surface: Surface) => void
  beforeCheckout?: (app: App | LocalApp, scene: Scene) => void
  onCheckout?: (app: App | LocalApp, scene: Scene) => void
  beforeUpdate?: (app: App | LocalApp, elapsed: number) => void
  beforePatch?: (
    app: App | LocalApp,
    elapsed: number,
    old: Widget,
    now: Widget,
  ) => void
  afterPatch?: (
    app: App | LocalApp,
    elapsed: number,
    old: Widget,
    now: Widget,
  ) => void
  // beforeAnimate?: (app: App | LocalApp, elapsed: number) => void
  // onAnimate?: (app: App | LocalApp, elapsed: number, widget: Widget) => void
  // afterAnimate?: (app: App | LocalApp, elapsed: number, widget: Widget) => void
  afterUpdate?: (app: App | LocalApp, elapsed: number) => void
}

export const defineCarPlugin = (plugin: CarPlugin): CarPlugin => plugin
