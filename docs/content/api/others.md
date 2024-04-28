## App Class

The `App` class is used to create and manage an application. It provides a canvas where you can render and animate Widgets.

### Constructor

- `constructor(element: HTMLCanvasElement, ck: CanvasKit, plugins: CarPlugin[])` : Creates a new instance of the application.
  - `element`: An HTMLCanvasElement where the application will be rendered.
  - `ck`: The CanvasKit namespace, containing functions and classes needed for rendering.
  - `plugins` (optional): An array of CarPlugin objects containing the plugins to be used.

### Methods

- `checkout(scene: Scene)`: Applies a scene to the application.

  - `scene`: The scene to be applied.

- `play()`: Starts playing the animations in the application.

- `pause()`: Pauses the animations in the application.

- `setUpdate(updateFunc: (elapsed: number) => void)`: Sets an update function that is called on each frame update.

  - `updateFunc`: The update function, which receives the elapsed time since the last frame in milliseconds.

- `use(plugin: CarPlugin)`: Uses the specified plugin.

  - `plugin`: The CarPlugin to be used.

- `setBackgroundColor(color: Color | 'transparent')`: Sets the background color of the application.
  - `color`: The background color or `'transparent'` for a transparent background.

## AsyncWidget Class

The `AsyncWidget` class is a subclass of Widget that handles asynchronously loaded Widgets.

### Methods

- `init(_ck: CanvasKit)`: Initializes the AsyncWidget and returns a Promise indicating the initialization state.

  - `_ck`: The CanvasKit namespace.

- `predraw(_ck: CanvasKit, _propertyChanged: string)`: Preloads necessary items before drawing and returns a Promise indicating the preloading state.

  - `_ck`: The CanvasKit namespace.
  - `_propertyChanged`: The name of the changed property.

- `preupdate(ck: CanvasKit, propertyChanged?: string)`: Preloads necessary items before updating and returns a Promise indicating the preloading state.

  - `ck`: The CanvasKit namespace.
  - `propertyChanged` (optional): The name of the changed property.

- `_isAsyncWidget()`: Returns `true` to indicate that this is an AsyncWidget.

## CanvasKit

`CanvasKit` is an external dependency that provides functions and classes needed for rendering graphics. You need to load CanvasKit before using the `newcar-canvas` library.

## CarEngine Class

The `CarEngine` class is used to manage applications and plugins.

### Methods

- `init(canvasKitWasmFile: string)`: Initializes the CarEngine and returns a Promise.

  - `canvasKitWasmFile`: The path to the CanvasKit WASM file.

- `use(plugin: CarPlugin)`: Uses the specified plugin.

  - `plugin`: The CarPlugin to be used.

- `createApp(element: HTMLCanvasElement)`: Creates a new instance of the App class.

  - `element`: An HTMLCanvasElement where the application will be rendered.

- `createLocalApp(width: number, height: number)`: Creates a new instance of the LocalApp class.
  - `width`: The width of the application.
  - `height`: The height of the application.

## CarPlugin Interface

The `CarPlugin` interface defines a plugin that can extend the functionality of CarEngine, App, or LocalApp.

### Properties

- `name: string`: The name of the plugin.

### Methods

The CarPlugin interface defines several optional methods that are called at different stages of the lifecycle of CarEngine, App, or LocalApp. You can implement these methods to extend functionality or modify default behavior.

- `beforeCanvasKitLoaded(engine: CarEngine)`: Called before CanvasKit is loaded.

  - `engine`: The CarEngine instance.

- `onCanvasKitLoaded(engine: CarEngine)`: Called after CanvasKit is loaded.

  - `engine`: The CarEngine instance.

- `beforeSurfaceLoaded(app: App | LocalApp)`: Called before the surface is loaded.

  - `app`: The App or LocalApp instance.

- `onSurfaceLoaded(app: App | LocalApp, surface: Surface)`: Called after the surface is loaded.

  - `app`: The App or LocalApp instance.
  - `surface`: The Surface instance.

- `beforeCheckout(app: App | LocalApp, scene: Scene)`: Called before a scene is applied.

  - `app`: The App or LocalApp instance.
  - `scene`: The Scene instance.

- `onCheckout(app: App | LocalApp, scene: Scene)`: Called after a scene is applied.

  - `app`: The App or LocalApp instance.
  - `scene`: The Scene instance.

- `beforeUpdate(app: App | LocalApp, elapsed: number)`: Called before each frame update.

  - `app`: The App or LocalApp instance.
  - `elapsed`: The elapsed time since the last frame in milliseconds.

- `beforePatch(app: App | LocalApp, elapsed: number, old: Widget, now: Widget)`: Called before a Widget is updated.

  - `app`: The App or LocalApp instance.
  - `elapsed`: The elapsed time since the last frame in milliseconds.
  - `old`: The old Widget.
  - `now`: The new Widget.

- `afterPatch(app: App | LocalApp, elapsed: number, old: Widget, now: Widget)`: Called after a Widget is updated.

  - `app`: The App or LocalApp instance.
  - `elapsed`: The elapsed time since the last frame in milliseconds.
  - `old`: The old Widget.
  - `now`: The new Widget.

- `afterUpdate(app: App | LocalApp, elapsed: number)`: Called after each frame update.
  - `app`: The App or LocalApp instance.
  - `elapsed`: The elapsed time since the last frame in milliseconds.

## LocalApp Class

The `LocalApp` class is similar to the App class, but it allows you to create an application without using an HTML canvas.

### Properties

- `width: number`: The width of the application.
- `height: number`: The height of the application.
- `ck`: The CanvasKit namespace.
- `plugins`: The array of plugins being used.
- `scene`: The current scene.
- `surface`: The Surface instance.
- `playing`: Indicates whether the application is playing.
- `last`: The timestamp of the last frame.
- `updates`: The array of update functions.
- `canvas`: The Canvas instance.

### Methods

- `constructor(width: number, height: number, ck: CanvasKit, plugins: CarPlugin[])` : Creates a new instance of the LocalApp class.

  - `width`: The width of the application.
  - `height`: The height of the application.
  - `ck`: The CanvasKit namespace.
  - `plugins` (optional): An array of CarPlugin objects containing the plugins to be used.

- `checkout(scene: Scene)`: Applies a scene to the application.

  - `scene`: The scene to be applied.

- `setUpdate(updateFunc: (elapsed: number) => void)`: Sets an update function that is called on each frame update.

  - `updateFunc`: The update function, which receives the elapsed time since the last frame in milliseconds.

- `use(plugin: CarPlugin)`: Uses the specified plugin.

  - `plugin`: The CarPlugin to be used.

- `getFrames(duration: number)`: Gets the frame data for the specified duration.
  - `duration`: The duration of the frames in milliseconds.

## Scene Class

The `Scene` class contains the root Widget and the elapsed time of the application.

### Properties

- `root`: The root Widget of the scene.
- `elapsed`: The elapsed time since the scene started in milliseconds.

### Constructor

- `constructor(root: Widget)`: Creates a new instance of the Scene class.
  - `root`: The root Widget of the scene.

## Surface Class

The `Surface` class represents a rendering surface used to draw Widgets.

## $ck Variable

The `$ck` variable contains the CanvasKit namespace. You can directly use it to access the functions and classes provided by CanvasKit.

## $source Object

The `$source` object contains font and image data.

- `fonts`: An array of array buffers containing font data.
- `images`: An array of array buffers containing image data.

## defineCarPlugin(plugin: CarPlugin)

The `defineCarPlugin` function is used to define a CarPlugin.

- `plugin`: The CarPlugin to be defined.

## useFont(src: string)

The `useFont` function is used to load font data.

- `src`: The path to the font data.

## useImage(src: string)

The `useImage` function is used to load image data.

- `src`: The path to the image data.
