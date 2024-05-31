---
title: 进阶动画
---

# 进阶动画

前面我们已经学过了如何使用 `changeProperty` 和 `changeStyle` 定义简单的属性动画吗，这让我们可以方便地实现一些类似 `fadeIn` 这样经典而简单的动画效果。
但简单的属性动画看起来还是有点单调，通过 `defineAnimation`，Newcar 提供了更加灵活的动画定义方式，让我们可以实现更加复杂的动画效果。

## `defineAnimation`

首先，我们需要先引入一个定义动画的函数：

```typescript
import { defineAnimation } from '@newcar/core'
```

这个函数接收一个实现了接口 `Animation` 的参数，返回一个 `Animation` 对象，这个对象与我们之前学过的 `changeProperty` 和 `changeStyle` 一样，
可以作为 `Widget.animate` 的参数传入，用于定义动画效果。

```typescript
export function defineAnimation<T extends Widget>(
  animation: Animation<T> & Record<string, any>,
): Animation<T> {
  return animation
}
```

## `Animation` 接口

`Animation` 接口定义如下：

```typescript
/**
 * The Animation interface having not gotten instanced
 */
export interface Animation<T> {
  /**
   * The action of this animation when it's in his lifecycle.
   * @param widget The widget's self.
   * @param elapsed The elapsed frame.
   * @param process The process of this animation, value is duration [0, 1]
   * @param params The other parameters of this animation
   * @returns
   */
  act: (widget: T, elapsed: number, process: number, duration: number, ck: CanvasKit, params?: any) => void

  init?: (widget: T, startAt: number, duration: number, ck: CanvasKit, params?: any) => void

  after?: (widget: T, elapsed: number, ck: CanvasKit, params?: any) => void
}
```

`Animation` 接口定义了三个方法：

- `act`：动画的执行方法，每一帧都会调用，`process` 表示动画的进度，取值范围为 [0, 1]。
- `init`：动画初始化方法，动画开始时调用。
- `after`：动画结束时调用。

其中 `act` 方法是必须实现的，`init` 和 `after` 方法是可选的，通常只在需要增加子组件或者清理资源时才会用到，下面我们来看一个例子：

## 使用 `defineAnimation` 定义一个动画

```typescript
import { defineAnimation } from '@newcar/core'
import { Color } from '@newcar/utils'
import type { Figure } from '../widgets'
import { Rect } from '../widgets'

/**
 * Create a rectangle that grows and shrinks around the center of the widget
 * and then destroys itself.
 */
export const showCreationThenDestructionAround = defineAnimation<Figure>({
  act(_widget, _elapsed, process, _duration, _ck, _params) {
    this.rect.show()
    if (process < 0.5) {
      this.rect.style.interval = [this.c * process * 2, this.c - this.c * process * 2]
    }
    else if (process > 0.5) {
      this.rect.style.interval = [this.c * (1 - process) * 2, this.c - this.c * (1 - process) * 2]
    }
  },

  init(widget, _startAt, _duration, _ck, params: {
    color: Color
    width: number
  }) {
    this.rect = new Rect(Math.abs(widget.range[2] - widget.range[0]) + 20, Math.abs(widget.range[3] - widget.range[1]) + 20, {
      x: widget.coordinateParentToChild(widget.range[0], widget.range[1]).x - 10,
      y: widget.coordinateParentToChild(widget.range[0], widget.range[1]).y - 10,
      style: {
        fill: false,
        border: true,
        borderColor: params.color ?? Color.WHITE,
        borderWidth: params.width ?? 2,
      },
    })
    this.c = Math.abs(widget.range[2] - widget.range[0] + 10) * 2
      + Math.abs(widget.range[3] - widget.range[1] + 10) * 2
    this.rect.hide()
    widget.add(this.rect)
  },

  after(_widget, _elapsed, _ck, _params) {
    this.rect.kill()
  },
})
```

在这个例子中，我们定义了一个动画 `showCreationThenDestructionAround`，这个动画会在组件外围创建一个矩形，然后绘制进入和退出的描边动画，最后销毁这个矩形。

让我们跟随动画的实例化来看看这个动画的实现：

### 实例化动画

当我们调用 `widget.animate(showCreationThenDestructionAround, 1, 1)` 时，
`showCreationThenDestructionAround` 会被实例化为 `AnimationInstance` 加入到 `widget` 的动画队列中，等待播放。

当 `widget` 被渲染时，`widget` 的动画队列会被遍历，`init` 方法依次被调用。

在上面的例子中，`init` 方法会创建一个矩形 `this.rect`，并将其添加到 `widget` 中。

:::tip
对 `this` 感到疑惑？`this` 指向的是 `AnimationInstance`，你可以向 `this` 中添加属性，以便在 `act` 和 `after` 方法中使用。

在上面的例子中我们使用 `this.rect` 存储 `Rect` 组件的引用，使用 `this.c` 存储矩形的周长。
:::

`init` 方法接收下面的参数：

- `widget`：动画的目标组件。
- `startAt`：动画开始的时间，一般当我们希望使用其他基础动画组合成复杂动画时会用到这个参数（注意：应当认为动画在 0 秒时被初始化）。
- `duration`：动画的持续时间，一般当我们希望使用其他基础动画组合成复杂动画时会用到这个参数。
- `ck`：CanvasKit 实例。
- `params`：动画的参数，这个参数是我们调用 `widget.animate` 时传入的第三个参数。

:::tip
`init` 方法是可选的，如果你的动画不需要初始化，可以不实现这个方法。

一般来说，动画的进度应当根据 `act` 方法中传入的 `process` 参数计算，而不是根据 `elapsed` `startAt` `duration` 等参数计算。
:::

### 执行动画

当 `widget` 被 `update` 时，`widget` 的动画队列会被遍历，`act` 方法依次被调用。

在上面的例子中，`act` 方法会根据 `process` 参数设置矩形的描边宽度，从而实现矩形的进入和退出动画。

`act` 方法接收下面的参数：

- `widget`：动画的目标组件。
- `elapsed`：动画已经持续的时间。
- `process`：动画的进度，取值范围为 [0, 1]。
- `duration`：动画的持续时间，一般当我们希望使用其他基础动画组合成复杂动画时会用到这个参数。
- `ck`：CanvasKit 实例。
- `params`：动画的参数，这个参数是我们调用 `widget.animate` 时传入的第三个参数。

### 结束动画

当动画播放结束时，`after` 方法会被调用。

在上面的例子中，我们在 `after` 方法中销毁了矩形 `this.rect`。

`after` 方法接收下面的参数：

- `widget`：动画的目标组件。
- `elapsed`：动画已经持续的时间。
- `ck`：CanvasKit 实例。
- `params`：动画的参数，这个参数是我们调用 `widget.animate` 时传入的第三个参数。

:::tip
`after` 方法是可选的，如果你的动画不需要清理资源，可以不实现这个方法。

值得注意的是，`after` 方法会在动画结束后可能会被重复调用，因此请确保你的 `after` 方法是幂等的。
:::
