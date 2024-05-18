---
title: 复合组件
---

# 复合组件

这里是 Widget 的进阶文档！在这里，我们将要介绍拼积木的方式来构建我们的 Widget——通过将一些基础的 Widget 组合在一起，我们可以创建出更复杂的 Widget：

```typescript
constructor(/** 省略 */) {
  this.add(new Widget(/** 省略 */))
}
```

很简单，对吧？

通过这种方式，即便看起来很复杂的图形也可以一步一步被我们实现！

接下来我们来动手实现一个箭头：

```typescript
import type { CanvasKit } from 'canvaskit-wasm'
import { deepMerge } from '@newcar/utils'
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
      style: deepMerge({
        color: this.style.borderColor,
        width: this.style.borderWidth,
      }, this.style),
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

在上面的代码中，我们添加了 `trim`（箭头的杆）和 `tip`（箭头的尖），给它们设置合适的大小、位置和样式，组合在一起就完成了箭头的实现。

### 计算方法

你可能会疑惑，上一节中我们提到的 `calculateIn` 方法和 `calculateRange` 方法在这里为什么都没有出现，这是因为 `Widget` 中默认的包装会自动处理子组件的计算，只有当前组件存在独立绘制的内容时才需要单独实现这两个方法（并且同样只需要考虑独立绘制的部分！）。

:::tip

请在 `construnctor` 里创建并加入子组件，因为 init 只有动画 play 后才会进行调用，所以可能会有一定的几率报错

:::
