---
title: 通用事件
---

# 通用事件

在之前的章节中，我们已经了解了如何使用 Newcar 内置的事件来实现丰富的交互效果。事实上，Newcar 的事件系统是非常灵活的，你可以自定义任何事件来实现你想要的效果。

总的来说，Newcar 中的事件可以分为两类：一类是通用事件（比如我们之前提到的 `click`、`drag` 等），它们通常需要单独引入，适用于所有组件；
另一类是组件事件，它们是特定组件的事件，在组件中被注册和触发，通过传入事件名成字符串来监听，不需要单独引入事件对象。

听不太明白？没关系，让我们先从通用事件开始。

## `defineEvent`

首先，我们需要先引入一个用于定义通用事件的函数：

```typescript
import { defineEvent } from '@newcar/core'
```

与 `defineAnimation` 类似，Newcar 提供了一个 `defineEvent` 函数，用于定义通用事件。
这个函数接收一个实现了 `Event` 接口的参数，返回一个 `Event` 对象，这个对象可以作为 `Widget.on` 的参数传入，用于定义事件的行为。

```typescript
export function defineEvent<T extends Widget>(event: Event<T>): Event<T> {
  return event
}
```

## `Event` 接口

`Event` 接口定义如下：

```typescript
/**
 * The event interface.
 */
export interface Event<T> {
  /**
   * The operation when set event.
   * @param widget The widget's self.
   * @param effect The effect function of this widget.
   * @param element The canvas element of this app.
   * @returns
   */
  operation: (
    widget: T,
    effect: (widget: Widget, ...arg: any[]) => any,
    element: HTMLCanvasElement,
  ) => void

  /**
   * The effect function of this event. Only used in the widget-based event.
   * @param widget The widget's self.
   * @param args The external arguments.
   * @returns
   */
  effects?: ((widget: Widget, ...arg: any[]) => any)[]
}
```

`Event` 接口定义了一个方法 `operation` 和一个可选的属性 `effects`，在这里我们只需要关注 `operation` 方法。

`operation` 方法用来注册事件监听器，接收三个参数：

- `widget`：事件绑定的组件。
- `effect`：事件的效果函数，也就是用户自定义的事件处理函数。
- `element`：应用的 canvas 元素。

## 使用 `defineEvent` 定义一个事件

下面我们来看一个例子，定义一个简单的 click 事件：

```typescript
import { Widget, defineEvent } from '@newcar/core'

export const click = defineEvent({
  operation(
    widget,
    effect: (widget: Widget, x: number, y: number) => any,
    element,
  ) {
    element.addEventListener('click', (event: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const absoluteX = event.clientX - rect.left
      const absoluteY = event.clientY - rect.top
      const { x, y } = Widget.absoluteToRelative(widget, absoluteX, absoluteY)
      const { x: pX, y: pY } = widget.coordinateChildToParent(x, y)
      const isIn = widget.isIn(pX, pY)
      if (isIn)
        effect(widget, x, y)
    })
  },
})
```

在这个例子中，我们定义了一个 `click` 事件，当点击组件时，会触发传入的效果函数 `effect`，并传入点击的坐标。

:::tip
有一个问题需要注意，由于事件监听器是绑定在 canvas 元素上的，所以我们有时需要将绝对坐标转换为相对坐标，将相对坐标转换为父组件的坐标。

在这个例子中，我们使用了 `Widget.absoluteToRelative` 方法将绝对坐标转换为相对坐标，以及 `Widget.coordinateChildToParent` 方法将相对坐标转换为父组件的坐标。
:::

我们也可以定义其他的事件，比如 `drag`、`mouseEnter`、`mouseLeave` 等，只需要按照上面的例子修改即可。

此外，也可以使用不同的方式来定义事件，只需要在希望触发事件的时候调用 `effect` 函数即可。
