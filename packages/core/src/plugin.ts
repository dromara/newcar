import type { Canvas, CanvasKit, Surface } from 'canvaskit-wasm'
import type { Scene } from './scene'
import type { App } from './app'
import type { LocalApp } from './localApp'
import type { CarEngine } from './engine'
import type { Widget } from './widget'

export interface GlobalPlugin {
  name: string
  key: string
  version: string

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
  onPatch?: (
    app: App | LocalApp,
    elapsed: number,
    old: Widget,
    now: Widget,
  ) => void
  beforeAnimate?: (app: App | LocalApp, elapsed: number, widget: Widget) => void
  onAnimate?: (app: App | LocalApp, elapsed: number, widget: Widget) => void
  onUpdate?: (app: App | LocalApp, elapsed: number) => void
}

export const defineGlobalPlugin = (plugin: GlobalPlugin): GlobalPlugin => plugin

export interface WidgetPlugin {
  beforeInitializing: (widget: Widget, ck: CanvasKit) => void
  onInitializing: (widget: Widget, ck: CanvasKit) => void
  pre: (widget: Widget, ck: CanvasKit, PropertyChanged: string) => void
  beforeDraw: (widget: Widget, canvas: Canvas) => void
  onDraw: (widget: Widget, canvas: Canvas) => void
  // TODO: `beforeAnimate` and `onAnimate`
  addition: Record<string, (...params: any[] | undefined[]) => any>
}

export const defineWidgetPlugin = (plugin: WidgetPlugin): WidgetPlugin => plugin
