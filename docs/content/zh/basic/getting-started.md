---
title: 快速开始
---

# 快速开始

欢迎阅读Newcar动画引擎的初学者指南！通过本指南，您可以了解有关 Newcar 的一些基本概念和知识，包括：

- `CarEngine`
- `App`
- `Scene`
- `Widget`
- `Animation`

这些概念将在以后的文档中详细解释。本指南将帮助您学习 Newcar 动画引擎的基本用法。

## 创建 Newcar 项目

"工欲善其事，必先利其器"

首先，请确保已安装以下工具：

- Node.js
- 例如 NPM, Yarn, 或 PNPM 的一种包管理器
- 例如 VSCode 或 Webstorm 的现代代码编辑器
- 一款支持 WebAssembly 编译的浏览器，这里我们推荐最新版本的 Firefox、Chrome、Edge

### Newcar CLI

我们提供了一个 [CLI 工具](https://www.npmjs.com/package/@newcar/cli) 来帮助你快速创建一个Newcar项目。

如果您是第一次使用它，则需要全局安装它。

:::code-group

```shell [npm]
$ npm install -g @newcar/cli
```

```shell [yarn]
$ yarn global add @newcar/cli
```

```shell [pnpm]
$ pnpm add -g @newcar/cli
```

:::

然后，您可以通过运行以下命令来创建 Newcar 项目：

```shell
$ ncli create my-newcar-project
$ cd my-newcar-project
$ npm install
```

### Vite CLI

我们推荐使用 [PNPM + Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) 来创建我们的项目。

```shell
$ pnpm create vite my-newcar-project
$ cd my-newcar-project
$ pnpm install
```

接下来，安装 Newcar 和 CanvasKit-WASM。

```shell
$ pnpm add newcar
$ pnpm add canvaskit-wasm
```

## 基本初始化

将 `<canvas>` 元素添加到 HTML 文件中以进行渲染。

```html
<canvas width="1600" height="900" id="canvas"></canvas>
```

然后，导入 Newcar 并初始化 `CarEngine` 对象。

```typescript
import * as nc from 'newcar'

const engine = await new nc.CarEngine().init('../node_modules/canvaskit-wasm/bin/canvaskit.wasm')
```

在上面的代码中，我们导入了 `newcar` 并将其命名为 `nc`。然后，我们创建了一个 `CarEngine` 对象，并传入了我们刚刚安装的 CanvasKit-WASM 文件。

## 创建动画应用

```typescript
import * as nc from 'newcar'

const engine = await new nc.CarEngine().init('../node_modules/canvaskit-wasm/bin/canvaskit.wasm')

const app = engine.createApp(document.querySelector('#canvas'))
```
我们使用 `CarEngine.createApp` 创建一个动画实例，并传入 `<canvas>` 的 DOM 对象。

## 创建场景并添加对象

```typescript
import * as nc from 'newcar'

const engine = await new nc.CarEngine().init('../node_modules/canvaskit-wasm/bin/canvaskit.wasm')
const app = engine.createApp(document.querySelector('#canvas'))
const root = new nc.Circle(100)
const scene = nc.createScene(root)
app.checkout(scene)
app.play()
```

首先，我们创建了一个圆形小部件，它是 [基本组件的官方扩展](/dev/basic-widget). 构造函数的第一个参数是圆的半径，我们将其设置为`100`。

然后，我们创建了一个 `Scene` 对象，并将圆形组件设置为此场景的根组件。一个场景只能有一个根组件，但一个根组件可以有多个子组件，而这些子组件可以有自己的子组件，从而形成一个场景的树状结构。

最后，我们使用 `App.checkout` 方法切换到这个场景，并使用 `App.play` 方法播放动画。

如果您正确设置了项目，您将在屏幕上看到一个白色圆圈。

## 添加动画

```typescript
root.animate(nc.create().withAttr({ duration: 1 }))
```

此方法将向此根小部件添加一个名为 `create` 的动画，并将动画设置为第一个时间单位开始。

祝贺！您已经学习了 Newcar 动画引擎的基本用法。我们稍后会更深入地解释。如果您喜欢我们的项目，请随时加入我们并在我们的[Repo](https://github.com/dromara/newcar)上贡献或给我们Star。

## 更改属性

在 Newcar 1.0.0 及更低版本中，您可以使用 `.[key]` 来设置组件属性，但在 Newcar 2.x 中，我们导入了反应式系统，某些种类的属性类型是 `Ref`，所以我们需要使用 `[key].value` 来更改某些属性的值。

例如，您定义了一个圆，并且想要更改其半径，则可以编写如下代码。

```ts
const circle = new Circle(100)
circle.radius.value = 200
```
