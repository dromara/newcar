---
title: 复合组件
---

# 复合组件

基本组件了解了吗？但完全使用 CanvasKit 绘制图形的方式不仅具有挑战性，而且很繁琐，我是说主要是因为繁琐啦。
毕竟自己计算每个图形的位置、大小、颜色实在是太麻烦了，稍微复杂一点的图形就会完全变成做数学题的情况，看起来一点也不优雅。
下面我们要介绍 Newcar 的设计哲学之——「拼积木」！

——将一些基础的 Widget 组合在一起，一个看起来很复杂的图形也可以一步一步被我们实现！

## Widget 组合——`add` 方法

```typescript
export class CompositeWidget extends Widget {
  constructor(/** 省略 */) {
    super(/** 省略 */);
    this.add(new Widget(/** 省略 */))
  }
}
```

首先让我们声明一个新的组件 `CompositeWidget` 继承自 `Widget`，然后在构造函数中调用 `add` 方法——一个新的 Widget 就被添加进来了！

很简单，对吧？这就是我们需要了解的所有内容，接下来我们将通过一个简单的例子来展示如何使用 `add` 方法。

## 一个简单的例子

接下来我们来动手实现一个箭头：

```typescript
import type { CanvasKit } from 'canvaskit-wasm'
import type { Vector2 } from '../../utils/vector2'
import type { FigureOptions, FigureStyle } from './figure'
import { Figure } from './figure'
import { Polygon } from './polygon'
import { Line } from './line'
import { Widget } from '@newcar/core'

/**
 * Calculates the rotation angle for an arrow based on the line's start and end points,
 * with the angle expressed in degrees. The angle is calculated with respect
 * to the horizontal axis pointing to the right.
 *
 * @param startPoint The starting point of the line.
 * @param endPoint The ending point of the line.
 * @returns The rotation angle in degrees, where 0 degrees points to the right (east),
 * and positive angles are measured clockwise.
 */

function calculateArrowRotationAngle(
  startPoint: Vector2,
  endPoint: Vector2,
): number {
  // Calculate the differences in the x and y coordinates
  const dx = endPoint[0] - startPoint[0]
  const dy = endPoint[1] - startPoint[1]
  // Calculate the angle in radians using Math.atan2(dy, dx)
  const angleRadians = Math.atan2(dy, dx)
  // Convert the angle to degrees
  let angleDegrees = angleRadians * (180 / Math.PI)
  // Normalize the angle to the range [0, 360)
  if (angleDegrees < 0)
    angleDegrees += 360
  return angleDegrees
}

export interface ArrowOptions extends FigureOptions {
  style?: ArrowStyle
}

export interface ArrowStyle extends FigureStyle {}

export class Arrow extends Figure {
  private tip: Polygon
  private trim: Line
  radian: number

  constructor(
    public from: Vector2,
    public to: Vector2,
    options?: ArrowOptions,
  ) {
    options ??= {}
    super(options)
    this.radian = calculateArrowRotationAngle(this.from, this.to)
    this.tip = new Polygon(
      [
        [0, 10],
        [22, 0],
        [0, -10],
      ],
      {
        x: this.to[0],
        y: this.to[1],
        style: {
          scaleX: this.from[0] > this.to[0] ? -1 : 1,
          scaleY: this.from[1] > this.to[1] ? -1 : 1,
          rotation: this.radian,
          ...this.style,
        },
        progress: this.progress,
      },
    )

    this.trim = new Line(this.from, this.to, {
      style: {
        color: this.style.borderColor,
        width: this.style.borderWidth,
        ...this.style,
      },
      progress: this.progress,
    })

    this.add(this.trim, this.tip)
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    switch (propertyChanged) {
      case 'from':
      case 'to': {
        this.radian = calculateArrowRotationAngle(this.from, this.to)
        this.tip.style.rotation = this.radian
        this.trim.from = this.from
        this.trim.to = this.to
        break
      }
      case 'progress': {
        this.tip.progress = this.progress
        this.trim.progress = this.progress
        break
      }
      case 'style.transparency': {
        this.tip.style.transparency = this.style.transparency
        this.trim.style.transparency = this.style.transparency
        break
      }
      case 'style.offset':
      case 'style.interval': {
        this.tip.style.offset = this.style.offset
        this.tip.style.interval = this.style.interval
      }
    }
  }
}
```

在上面的代码中，我们为箭头组件添加了 `trim`（箭头的杆）和 `tip`（箭头的尖），然后给它们设置了合适的大小、位置和样式
——这样我们就实现了一个箭头组件！

:::tip
请在 `construnctor` 里创建并加入子组件，因为 init 只有动画 play 后才会进行调用，所以可能会有一定的几率报错
:::

### 计算方法

你可能会疑惑，上一节中我们提到的 `calculateIn` 方法和 `calculateRange` 方法在这里为什么都没有出现，这是因为 `Widget` 中默认的包装会自动处理子组件的计算，只有当前组件存在独立绘制的内容时才需要单独实现这两个方法（并且同样只需要考虑独立绘制的部分！）。
