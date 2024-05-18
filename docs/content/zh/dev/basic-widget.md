---
title: 基本组件
---

# 基本组件

欢迎来到 Newcar 拓展的开发教程！我们会逐步讲解 Newcar 拓展的开发方式，以便于大家更好的开发 Newcar 拓展！

我们需要用到的包有

- `@newcar/core` Newcar 的核心包
- `@newcar/basic` Newcar 的基础图形包
- `@newcar/utils` Newcar 的工具包
- `canvaskit-wasm` 老朋友了，CanvasKit-WASM 的包

在你的项目目录里安装这两个包，然后你便可以开发 Widgets 了！

我们的所有 Widget 都是继承（或者间接继承）自 `Widget`，我们需要实现 `Widget` 中定义的一些方法供内核操作

## 基础结构

为了使用户有更完整的类型体验感，我们推荐使用 TypeScript 来代替 JavaScript 开发

```typescript
import { Widget } from '@newcar/core'
import type { WidgetRange } from '@newcar/core'
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

  // 初始化Widget的方法
  init(ck: CanvasKit) {}

  // 按需更新属性
  predraw(ck: CanvasKit, prop: string) {}

  // 绘制
  draw(canvas: Canvas) {}
}
```

- `MyWidgetOptions` 自定义Widget的选项，包含样式
- `MyWidgetStyle` 自定义Widget的样式
- `MyWidget` 自定义Widget本体
  - `init` 初始化
    - `ck` CanvasKit-WASM的命名空间
  - `predraw` 预绘制，包括按需更新
    - `ck` CanvasKit-WASM的命名空间
    - `prop` 改变的参数
  - `draw` 绘制函数
    - `canvas` CanvasKit-WASM的画布对象

关于CanvasKit-WASM的使用，请参见[Skia官网](https://skia.org)

现在让我们来实现一个三角形吧：

```typescript
import { Widget } from '@newcar/core'
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
    options ??= {} // 为了防止用户传入空的options,我们这里加一个判断
    options.style ??= {}
    super(options)
    this.style.color = options.style.color
  }

  // 初始化Widget的方法
  init(ck: CanvasKit) {
    this.paint = new ck.Paint()
    this.path = new ck.Path()
    // 特别注意，这里需要转为Float4格式
    this.paint.setColor(this.style.color.toFloat4)
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
    // 这是一个简单的例子，对于基本形状，你可以使用CanvasKit的内置方法
    return this.path.contains(x, y)
  }

  calculateRange(): WidgetRange {
    // 计算形状边界（基于自身相对坐标系）
    // 这是一个简单的例子，对于基本形状，你可以使用CanvasKit的内置方法
    const bounds = this.path.computeTightBounds()
    return [...bounds] as WidgetRange
  }
}
```

## 实现计算方法

在上面的例子中，我们添加了两个计算方法：`calculateIn` 和 `calculateRange`。这两个方法用于计算点是否在三角形内以及三角形的范围，这两个方法用于计算 Widget 的交互区域。

对于使用 CanvasKit.Path 绘制的基本形状，你可以使用 CanvasKit 的内置方法来计算交互区域。对于更复杂的形状，可能需要自定义计算方法。

### 自身相对坐标系

在计算方法中，我们使用的是基于组件自身的相对坐标系。这意味着我们不需要考虑组件的位置和变换，只需要考虑组件本身的形状。

实际上，组件的 `isIn` 和 `range` 方法对我们的实现进行了包装，使我们可以更方便地计算组件的交互区域（而无需关心与之无关的其他内容）。

## 总结

在本文中，我们介绍了 Widget 的基本结构以及如何实现一个简单的三角形。在下一篇文章中，我们将介绍“拼积木”的方法来构建 Widget。敬请期待！