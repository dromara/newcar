import type { Canvas, CanvasKit, Surface } from 'canvaskit-wasm'
import type { Scene } from './scene'
import type { App } from './app'
import type { LocalApp } from './local-app'
import type { CarEngine } from './engine'
import type { Widget } from './widget'

/**
 * The GlobalPlugin interface represents a global plugin that can be used with the application.
 * It provides a set of lifecycle methods that can be implemented to hook into different stages of the application's lifecycle.
 */
export interface GlobalPlugin {
  /**
   * The name of the plugin.
   */
  name: string

  /**
   * A unique identifier for the plugin.
   */
  key: string

  /**
   * The version of the plugin.
   */
  version: string

  /**
   * Called before the CanvasKit library is loaded by the engine.
   * @param {CarEngine} engine - The instance of the CarEngine.
   */
  beforeCanvasKitLoaded?: (engine: CarEngine) => void

  /**
   * Called after the CanvasKit library is loaded by the engine.
   * @param {CarEngine} engine - The instance of the CarEngine.
   */
  onCanvasKitLoaded?: (engine: CarEngine) => void

  /**
   * Called before a surface is created by the application.
   * @param {App | LocalApp} app - The instance of the application.
   */
  beforeSurfaceLoaded?: (app: App | LocalApp) => void

  /**
   * Called after a surface is created by the application.
   * @param {App | LocalApp} app - The instance of the application.
   * @param {Surface} surface - The surface instance.
   */
  onSurfaceLoaded?: (app: App | LocalApp, surface: Surface) => void

  /**
   * Called before a new scene is checked out by the application.
   * @param {App | LocalApp} app - The instance of the application.
   * @param {Scene} scene - The new scene to be checked out.
   */
  beforeCheckout?: (app: App | LocalApp, scene: Scene) => void

  /**
   * Called after a new scene is checked out by the application.
   * @param {App | LocalApp} app - The instance of the application.
   * @param {Scene} scene - The new scene that has been checked out.
   */
  onCheckout?: (app: App | LocalApp, scene: Scene) => void

  /**
   * Called before the application updates.
   * @param {App | LocalApp} app - The instance of the application.
   * @param {number} elapsed - The elapsed time since the last update.
   */
  beforeUpdate?: (app: App | LocalApp, elapsed: number) => void

  /**
   * Called before the application patches the old widget with the new widget.
   * @param {App | LocalApp} app - The instance of the application.
   * @param {number} elapsed - The elapsed time since the last update.
   * @param {Widget} old - The old widget.
   * @param {Widget} now - The new widget.
   */
  beforePatch?: (
    app: App | LocalApp,
    elapsed: number,
    old: Widget,
    now: Widget
  ) => void

  /**
   * Called after the application patches the old widget with the new widget.
   * @param {App | LocalApp} app - The instance of the application.
   * @param {number} elapsed - The elapsed time since the last update.
   * @param {Widget} old - The old widget.
   * @param {Widget} now - The new widget.
   */
  onPatch?: (
    app: App | LocalApp,
    elapsed: number,
    old: Widget,
    now: Widget
  ) => void

  /**
   * Called before a widget is animated.
   * @param {App | LocalApp} app - The instance of the application.
   * @param {number} elapsed - The elapsed time since the last update.
   * @param {Widget} widget - The widget to be animated.
   */
  beforeAnimate?: (
    app: App | LocalApp,
    elapsed: number,
    widget: Widget
  ) => void

  /**
   * Called after a widget is animated.
   * @param {App | LocalApp} app - The instance of the application.
   * @param {number} elapsed - The elapsed time since the last update.
   * @param {Widget} widget - The widget that has been animated.
   */
  onAnimate?: (
    app: App | LocalApp,
    elapsed: number,
    widget: Widget
  ) => void

  /**
   * Called after the application updates.
   * @param {App | LocalApp} app - The instance of the application.
   * @param {number} elapsed - The elapsed time since the last update.
   */
  onUpdate?: (app: App | LocalApp, elapsed: number) => void

  onPlay?: (app: App | LocalApp) => void
}

/**
 * Defines a global plugin and returns the plugin object.
 * @param {GlobalPlugin} plugin - The plugin object to be defined.
 * @returns {GlobalPlugin} The defined plugin object.
 */
export const defineGlobalPlugin = <T extends GlobalPlugin>(plugin: T): GlobalPlugin => plugin

/**
 * The WidgetPlugin interface represents a plugin that can be used with a widget.
 * It provides a set of lifecycle methods that can be implemented to hook into different stages of a widget's lifecycle.
 */
export interface WidgetPlugin {
  /**
   * Called before a widget is initialized.
   * @param {Widget} widget - The widget to be initialized.
   * @param {CanvasKit} ck - The CanvasKit instance.
   */
  beforeInitializing: (widget: Widget, ck: CanvasKit) => void

  /**
   * Called after a widget is initialized.
   * @param {Widget} widget - The widget that has been initialized.
   * @param {CanvasKit} ck - The CanvasKit instance.
   */
  onInitializing: (widget: Widget, ck: CanvasKit) => void

  /**
   * Called before a widget's properties are updated.
   * @param {Widget} widget - The widget whose properties are being updated.
   * @param {CanvasKit} ck - The CanvasKit instance.
   * @param {string} PropertyChanged - The name of the property that has changed.
   */
  pre: (widget: Widget, ck: CanvasKit, PropertyChanged: string) => void

  /**
   * Called before a widget is drawn.
   * @param {Widget} widget - The widget to be drawn.
   * @param {Canvas} canvas - The canvas on which the widget will be drawn.
   */
  beforeDraw: (widget: Widget, canvas: Canvas) => void

  /**
   * Called after a widget is drawn.
   * @param {Widget} widget - The widget that has been drawn.
   * @param {Canvas} canvas - The canvas on which the widget was drawn.
   */
  onDraw: (widget: Widget, canvas: Canvas) => void

  /**
   * Additional methods that can be defined for the widget plugin.
   */
  addition: Record<string, (...params: any[] | undefined[]) => any>
}

/**
 * Defines a widget plugin and returns the plugin object.
 * @param {WidgetPlugin} plugin - The plugin object to be defined.
 * @returns {WidgetPlugin} The defined plugin object.
 */
export const defineWidgetPlugin = <T extends WidgetPlugin>(plugin: T): WidgetPlugin => plugin
