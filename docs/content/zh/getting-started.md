---
title: 快速开始
---

# 快速开始

欢迎来到 Newcar 动画引擎的入门指南！在这里，你将学到 Newcar 的一些基础概念和相关知识，包括：

- `CarEngine`
- `App`
- `Scene`
- `Widget`
- `Animation`

这些概念和知识将会在系列文档中详细讲解，本篇将粗略地介绍 Newcar 动画引擎的基础用法，让你快速掌握 Newcar 的开发哲学，话不多说，我们开始吧！

## 创建一个 Newcar 项目

“工欲善其事，必先利其器。”

首先你需要准备的环境和工具有：

- Node.js（推荐 LTS 18 及更高版本）
- 包管理器（npm、pnpm 或 yarn）
- 一个现代的代码编辑器，如 VSCode、WebStorm 等
- 一个支持 WebAssembly 的浏览器，查看 [支持浏览器版本列表](https://caniuse.com/?search=WebAssembly)

我们推荐使用 pnpm 包管理器和 Vite 去创建项目。为了方便演示，本文我们使用最简单的 Vanilla 结构。当然，你也可以选择你喜欢的框架，并且 Newcar 官方计划在未来逐步提供官方的一些框架包装器。

```shell
$ pnpm create vite my-newcar-project
$ cd my-newcar-project
$ pnpm install
```

接着我们需要安装依赖，Newcar 本体和它的 peerDependency —— CanvasKit-WASM：

```shell
$ pnpm add newcar
$ pnpm add canvaskit-wasm
```

接着，在 `index.html` 的 `<body>` 标签内加入一个 `<canvas>` 标签：

```html
<canvas width="1600" height="900" id="canvas"></canvas>
```

Vite 在 `index.html` 里引入了 `main.ts`，我们需要将其中的代码替换成如下：

```typescript
import * as nc from 'newcar'

const engine = await new nc.CarEngine().init('../node_modules/canvaskit-wasm/bin/canvaskit.wasm')
```

在上述的代码中，我们引入了 `newcar` 并将它重新命名为 `nc`, 然后我们创建了一个 `CarEngine` 对象并传入了刚才安装的 CanvasKit-WASM 的二进制文件路径。

## 创建一个动画程序

```typescript
import * as nc from 'newcar'

const engine = await new nc.CarEngine().init('../node_modules/canvaskit-wasm/bin/canvaskit.wasm')
const app = engine.createApp(document.querySelector('#canvas'))
```

这里我们使用 `CarEngine.createApp` 创建了一个动画实例，并传入了 `<canvas>` 的 DOM 对象。

## 创建场景并加入对象

```typescript
import * as nc from 'newcar'

const engine = await new nc.CarEngine().init('../node_modules/canvaskit-wasm/bin/canvaskit.wasm')
const app = engine.createApp(document.querySelector('#canvas'))
const root = new nc.Circle(100)
const scene = new nc.Scene(root)
app.checkout(scene)
app.play()
```

首先我们创建了 `root`，这里的根是一个 `Circle` 类，继承自 `Widget`，`Circle` 类构造函数的第一个参数是圆的半径，在这里我们设为 `100`。

接着创建一个 `Scene` 对象，并将刚刚创建的 `root` 设置为这个场景的根组件（Widget）。注意，一个场景只能有一个根组件（Widget），但一个根组件可以有多个子组件，子组件又可以有子组件，如此形成一个场景的树状结构。

最后我们使用 `App.checkout()` 方法切换到了这个场景，并使用 `App.play()` 方法播放动画。

如果一切都没有问题的话，此时，你会在画布上看见一个半径为 `100` 的白色的圆。

## 添加动画

```typescript
root.animate(nc.create, 0, 30)
```

此方法会给这个根组件添加一个名为 `create` 的动画，并设置动画的开始时间为第 0 个时间单位。

恭喜你！你已经了解了 Newcar 动画引擎的基本使用方法，接下来我们会详细讲解每个概念。

如果喜欢我们的项目，欢迎加入我们，给我们做贡献或在 GitHub 上给我们一个免费的 Star。
