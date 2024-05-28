---
title: 基本组件
---

# 基本组件

欢迎来到 Newcar 拓展的开发教程！
在之前的文档中，我们介绍了 Newcar 的基本概念、设计模式，以及如何使用 Newcar 提供的基本组件和其他能力来构建一个自己的应用。
尽管 Newcar 中提供了丰富的预设组件及效果，但如果没有「自定义」，不仅会限制应用的表现力，而且听起来也太不酷了，不是吗？

在这组文档中，我们将围绕 Newcar 的各项进阶能力展开，并介绍如何在 Newcar 中实现各种或简单或复杂的自定义效果。
它们也许不一定是最好的，但是它们是我们的！

:::tip
顺带一提，如果你有了一个很棒的 idea，并且希望它成为 Newcar 的一部分，欢迎向我们提交 PR 哦！
:::

我们需要用到的包有

- `@newcar/core` Newcar 的核心包
- `@newcar/basic` Newcar 的基础图形包
- `@newcar/utils` Newcar 的工具包
- `canvaskit-wasm` 老朋友了，CanvasKit-WASM 的包

在你的项目目录里安装这几个包，然后让我们开始「自定义」开发的旅程吧！

:::tip
推荐使用 TypeScript 来获得更好的类型提示和体验哦！
:::

## `Widget` 是什么？

我们的所有 Widget 都继承（或者间接继承）自 `Widget`，这是 Newcar 的核心类。
在这个类中，我们定义了 Widget 的基本结构和方法，包括初始化、预绘制和绘制。

当 Newcar 内核渲染 Widget 时，它会调用这些方法来初始化 Widget、更新属性和绘制 Widget。
——实现一个自定义的过程就是实现这些方法！

准备好开始了吗？下面让我们来看一个简单的例子。

## 基础结构

```typescript
import { Widget } from '@newcar/core'
import type { Canvas, CanvasKit } from 'canvaskit-wasm'

export interface MyWidgetOptions {
  style?: MyWidgetStyle
}

export interface MyWidgetStyle {}

export class MyWidget extends Widget {
  constructor(options?: MyWidgetOptions) {
    options ??= {} // 为了防止用户传入空的options,我们这里加一个判断
    super(options)
  }

  // 初始化 Widget 的方法
  init(ck: CanvasKit) {}

  // 按需更新属性
  predraw(ck: CanvasKit, prop: string) {}

  // 绘制
  draw(canvas: Canvas) {}
}
```

- `MyWidgetOptions` 你的 Widget 的配置项（一般默认需要包含样式）
- `MyWidgetStyle` 你的 Widget 的样式
- `MyWidget` 你的 Widget 类，必须继承自 `Widget` 哦
  - `constructor` 构造函数，接收配置项，进行一些简单的处理
  - `init` 初始化，这个方法会在 Widget 准备被绘制时调用
    - `ck` CanvasKit-WASM 的命名空间
  - `predraw` 预绘制，这个方法会在 Widget 每次绘制前调用（需要处理属性的按需更新）
    - `ck` CanvasKit-WASM 的命名空间
    - `prop` 被更新的属性
  - `draw` 绘制，这个方法会在 Widget 每次绘制时调用，需要将你的自定义形状绘制到 `canvas` 上
    - `canvas` CanvasKit-WASM 的画布对象

:::info
想了解更多 CanvasKit-WASM 的使用？参见 [Skia 官网](https://skia.org)
:::

## 一个简单的例子

有点抽象？唔，那么……现在让我们来实现一个三角形吧!

```typescript
import { Widget } from '@newcar/core'
import type { WidgetRange } from '@newcar/core'
import { Color } from '@newcar/utils'
import type { Canvas, CanvasKit, Paint, Path } from 'canvaskit-wasm'

export interface MyWidgetOptions {
  style?: MyWidgetStyle
}

export interface MyWidgetStyle {
  color: Color
}

export class MyWidget extends Widget {
  paint: Paint
  path: Path
  declare style: MyWidgetStyle

  constructor(
    public point1: [number, number],
    public point2: [number, number],
    public point3: [number, number],
    options?: MyWidgetOptions
  ) {
    options ??= {} // 防止用户传入空的 options，我们这里提供一个缺省值
    options.style ??= {}
    super(options)
    this.style.color = options.style.color
  }

  // 初始化
  init(ck: CanvasKit) {
    this.paint = new ck.Paint()
    this.path = new ck.Path()
    // 特别注意，颜色需要转为 Float4 格式
    this.paint.setColor(this.style.color.toFloat4)
    // 还有一点需要注意，颜色转换为 Float4 格式后会丢失透明度，我们可以通过 setAlphaf 方法重新设置透明度
    this.paint.setAlphaf(this.style.color.alpha)
    this.paint.setStyle(ck.PaintStyle.Stroke)
  }

  // 按需更新属性
  predraw(ck: CanvasKit, prop: string) {
    switch (prop) {
      case 'style.color': {
        // 这里也是
        this.paint.setColor(this.style.color.toFloat4())
        break
      }
      case 'point1':
      case 'point2':
      case 'point3': {
        this.path.moveTo(...this.point1)
        this.path.lineTo(...this.point2)
        this.path.lineTo(...this.point3)
        this.path.close()
      }
    }
  }

  // 绘制
  draw(canvas: Canvas) {
    canvas.drawPath(this.path, this.paint)
  }

  calculateIn(x: number, y: number) {
    // 计算点是否在三角形内（基于自身相对坐标系）
    // 这是一个简单的例子，对于基本形状，你可以直接使用 CanvasKit 的内置方法
    return this.path.contains(x, y)
  }

  calculateRange(): WidgetRange {
    // 计算形状边界（基于自身相对坐标系）
    // 这是一个简单的例子，对于基本形状，你可以直接使用 CanvasKit 的内置方法
    const bounds = this.path.computeTightBounds()
    return [...bounds] as WidgetRange
  }
}
```

## 实现计算方法

在上面的例子中，我们添加了两个计算方法：`calculateIn` 和 `calculateRange`。
这两个方法用于计算点是否在三角形内以及三角形的范围，这两个方法用于计算 Widget 的交互区域。

对于使用 CanvasKit.Path 绘制的基本形状，你可以使用 CanvasKit 的内置方法来计算交互区域。对于更复杂的形状，可能需要自定义计算方法。

### 自身相对坐标系

在计算方法中，我们使用的是基于组件自身的相对坐标系。这意味着我们不需要考虑组件的位置和变换，只需要考虑组件本身的形状。

实际上，组件的 `isIn` 和 `range` 方法对我们的实现进行了包装，使我们可以更方便地计算组件的交互区域（而无需关心与之无关的其他内容）。

## 总结

在本文中，我们介绍了 Widget 的基本结构以及如何实现一个简单的三角形。在下一篇文章中，我们将介绍“拼积木”的方法来构建 Widget。敬请期待！