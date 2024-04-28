## App 类

`App` 类用于创建和管理一个应用程序。它提供了一个画布，您可以在其中渲染和动画 Widget。

### 构造函数

- `constructor(element: HTMLCanvasElement, ck: CanvasKit, plugins: CarPlugin[])`：创建一个新的应用程序实例。
  - `element`：一个 HTMLCanvasElement，用于渲染应用程序。
  - `ck`：CanvasKit 命名空间，包含渲染所需的函数和类。
  - `plugins`（可选）：一个 CarPlugin 数组，包含要使用的插件。

### 方法

- `checkout(scene: Scene)`：将场景应用到应用程序中。

  - `scene`：要应用的场景。

- `play()`：开始播放应用程序中的动画。

- `pause()`：暂停应用程序中的动画。

- `setUpdate(updateFunc: (elapsed: number) => void)`：设置一个更新函数，在每个帧更新时被调用。

  - `updateFunc`：更新函数，接受自上一个帧以来经过的时间（以毫秒为单位）。

- `use(plugin: CarPlugin)`：使用指定的插件。

  - `plugin`：要使用的 CarPlugin。

- `setBackgroundColor(color: Color | 'transparent')`：设置应用程序的背景颜色。
  - `color`：背景颜色或 `'transparent'` 表示透明背景。

## AsyncWidget 类

`AsyncWidget` 类是 Widget 的子类，用于处理异步加载的 Widget。

### 方法

- `init(_ck: CanvasKit)`：初始化 AsyncWidget，返回一个 Promise，表示初始化状态。

  - `_ck`：CanvasKit 命名空间。

- `predraw(_ck: CanvasKit, _propertyChanged: string)`：在绘制之前预加载必要的项目，返回一个 Promise，表示预加载状态。

  - `_ck`：CanvasKit 命名空间。
  - `_propertyChanged`：已更改的属性名称。

- `preupdate(ck: CanvasKit, propertyChanged?: string)`：在更新之前预加载必要的项目，返回一个 Promise，表示预加载状态。

  - `ck`：CanvasKit 命名空间。
  - `propertyChanged`（可选）：已更改的属性名称。

- `_isAsyncWidget()`：返回 `true`，表示这是 AsyncWidget。

## CanvasKit

`CanvasKit` 是一个外部依赖项，它提供渲染图形所需的函数和类。您需要在使用 `newcar-canvas` 库之前加载 CanvasKit。

## CarEngine 类

`CarEngine` 类用于管理应用程序和插件。

### 方法

- `init(canvasKitWasmFile: string)`：初始化 CarEngine，返回一个 Promise。

  - `canvasKitWasmFile`：CanvasKit WASM 文件的路径。

- `use(plugin: CarPlugin)`：使用指定的插件。

  - `plugin`：要使用的 CarPlugin。

- `createApp(element: HTMLCanvasElement)`：创建一个新的 App 实例。

  - `element`：一个 HTMLCanvasElement，用于渲染应用程序。

- `createLocalApp(width: number, height: number)`：创建一个新的 LocalApp 实例。
  - `width`：应用程序的宽度。
  - `height`：应用程序的高度。

## CarPlugin 接口

`CarPlugin` 接口定义了一个插件，可以扩展 CarEngine、App 或 LocalApp 的功能。

### 属性

- `name: string`：插件的名称。

### 方法

CarPlugin 接口定义了多个可选的方法，这些方法在 CarEngine、App 或 LocalApp 的生命周期中不同时刻被调用。您可以实现这些方法来扩展功能或修改默认行为。

- `beforeCanvasKitLoaded(engine: CarEngine)`：在 CanvasKit 加载之前被调用。

  - `engine`：CarEngine 实例。

- `onCanvasKitLoaded(engine: CarEngine)`：在 CanvasKit 加载后被调用。

  - `engine`：CarEngine 实例。

- `beforeSurfaceLoaded(app: App | LocalApp)`：在表面加载之前被调用。

  - `app`：App 或 LocalApp 实例。

- `onSurfaceLoaded(app: App | LocalApp, surface: Surface)`：在表面加载后被调用。

  - `app`：App 或 LocalApp 实例。
  - `surface`：Surface 实例。

- `beforeCheckout(app: App | LocalApp, scene: Scene)`：在场景应用之前被调用。

  - `app`：App 或 LocalApp 实例。
  - `scene`：Scene 实例。

- `onCheckout(app: App | LocalApp, scene: Scene)`：在场景应用后被调用。

  - `app`：App 或 LocalApp 实例。
  - `scene`：Scene 实例。

- `beforeUpdate(app: App | LocalApp, elapsed: number)`：在每个帧更新之前被调用。

  - `app`：App 或 LocalApp 实例。
  - `elapsed`：自上一个帧以来经过的时间（以毫秒为单位）。

- `beforePatch(app: App | LocalApp, elapsed: number, old: Widget, now: Widget)`：在 Widget 更新之前被调用。

  - `app`：App 或 LocalApp 实例。
  - `elapsed`：自上一个帧以来经过的时间（以毫秒为单位）。
  - `old`：旧的 Widget。
  - `now`：新的 Widget。

- `afterPatch(app: App | LocalApp, elapsed: number, old: Widget, now: Widget)`：在 Widget 更新后被调用。

  - `app`：App 或 LocalApp 实例。
  - `elapsed`：自上一个帧以来经过的时间（以毫秒为单位）。
  - `old`：旧的 Widget。
  - `now`：新的 Widget。

- `afterUpdate(app: App | LocalApp, elapsed: number)`：在每个帧更新后被调用。
  - `app`：App 或 LocalApp 实例。
  - `elapsed`：自上一个帧以来经过的时间（以毫秒为单位）。

## LocalApp 类

`LocalApp` 类类似于 App 类，但它允许您在不使用 HTML 画布的情况下创建应用程序。

### 属性

- `width: number`：应用程序的宽度。
- `height: number`：应用程序的高度。
- `ck`：CanvasKit 命名空间。
- `plugins`：使用的插件数组。
- `scene`：当前场景。
- `surface`：Surface 实例。
- `playing`：指示应用程序是否正在播放。
- `last`：上一个帧的时间戳。
- `updates`：更新函数数组。
- `canvas`：Canvas 实例。

### 方法

- `constructor(width: number, height: number, ck: CanvasKit, plugins: CarPlugin[])`：创建一个新的 LocalApp 实例。

  - `width`：应用程序的宽度。
  - `height`：应用程序的高度。
  - `ck`：CanvasKit 命名空间。
  - `plugins`（可选）：一个 CarPlugin 数组，包含要使用的插件。

- `checkout(scene: Scene)`：将场景应用到应用程序中。

  - `scene`：要应用的场景。

- `setUpdate(updateFunc: (elapsed: number) => void)`：设置一个更新函数，在每个帧更新时被调用。

  - `updateFunc`：更新函数，接受自上一个帧以来经过的时间（以毫秒为单位）。

- `use(plugin: CarPlugin)`：使用指定的插件。

  - `plugin`：要使用的 CarPlugin。

- `getFrames(duration: number)`：获取指定持续时间的帧数据。
  - `duration`：帧的持续时间（以毫秒为单位）。

## Scene 类

`Scene` 类包含应用程序的根 Widget 和经过的时间。

### 属性

- `root`：场景的根 Widget。
- `elapsed`：自场景开始以来经过的时间（以毫秒为单位）。

### 构造函数

- `constructor(root: Widget)`：创建一个新的 Scene 实例。
  - `root`：场景的根 Widget。

## Surface 类

`Surface` 类表示一个渲染表面，用于绘制 Widget。

## $ck 变量

`$ck` 变量包含 CanvasKit 命名空间。您可以直接使用它来访问 CanvasKit 提供的函数和类。

## $source 对象

`$source` 对象包含字体和图像数据。

- `fonts`：字体数据的数组缓冲区数组。
- `images`：图像数据的数组缓冲区数组。

## defineCarPlugin(plugin: CarPlugin)

`defineCarPlugin` 函数用于定义一个 CarPlugin。

- `plugin`：要定义的 CarPlugin。

## useFont(src: string)

`useFont` 函数用于加载字体数据。

- `src`：字体数据的路径。

## useImage(src: string)

`useImage` 函数用于加载图像数据。

- `src`：图像数据的路径。
