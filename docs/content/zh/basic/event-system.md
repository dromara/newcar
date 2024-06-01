---
title: 交互系统
---

# 交互系统

你是否想过给你的 Newcar 动画添加一些更生动的内容？点击一个正方形切换到下一个场景？亦或者是将鼠标悬浮在某个图形上变大。交互系统可以实现你对这方面的一切幻想

在 `1.0.0-alpha.0` 中，我们正式发布了交互系统，你可以使用它们来实现像 flash 一样的交互效果。

下面是一个简单的例子，当你点击这个正方形时，控制台会打印 `Clicked!`：

```typescript
import * as nc from 'newcar'

const root = new nc.Rect([0, 0], [100, 100])
  .on(nc.click, (widget, x, y) => {
    console.log('Clicked!')
  })

const scene = new nc.Scene(root)
```

试着打开控制台并点击他，你将会看见 `Clicked!`  被打印在控制台上

## 内置通用事件

除此之外，Newcar 还内置了许多种不同的事件供你选择，比如：

- [`click`](https://apis.newcarjs.org/variables/_newcar_basic.click)
- [`drag`](https://apis.newcarjs.org/variables/_newcar_basic.drag)
- [`dragEnd`](https://apis.newcarjs.org/variables/_newcar_basic.dragend)
- [`dragEnter`](https://apis.newcarjs.org/variables/_newcar_basic.dragenter)
- [`dragLeave`](https://apis.newcarjs.org/variables/_newcar_basic.dragleave)
- [`dragOver`](https://apis.newcarjs.org/variables/_newcar_basic.dragover)
- [`dragStart`](https://apis.newcarjs.org/variables/_newcar_basic.dragstart)
- [`drop`](https://apis.newcarjs.org/variables/_newcar_basic.drop)
- [`keyDown`](https://apis.newcarjs.org/variables/_newcar_basic.keydown)
- [`keyPressed`](https://apis.newcarjs.org/variables/_newcar_basic.keypressed)
- [`keyUp`](https://apis.newcarjs.org/variables/_newcar_basic.keyup)
- [`mouseEnter`](https://apis.newcarjs.org/variables/_newcar_basic.mouseenter)
- [`mouseLeave`](https://apis.newcarjs.org/variables/_newcar_basic.mouseleave)
- [`mouseMove`](https://apis.newcarjs.org/variables/_newcar_basic.mousemove)
- [`mouseOut`](https://apis.newcarjs.org/variables/_newcar_basic.mouseout)
- [`mouseOver`](https://apis.newcarjs.org/variables/_newcar_basic.mouseover)
- [`mouseUp`](https://apis.newcarjs.org/variables/_newcar_basic.mouseup)
- ……更多事件还在开发中，你也可以依据[通用事件](../dev/common-event)中的方法自定义事件，欢迎 PR！

## 组件事件

在 Newcar 中，一些复杂的组件可能会触发自己的自定义事件。你同样可以通过 `on` 方法来监听这些事件，这时应该传入事件名称字符串，比如：

```typescript
import * as nc from 'newcar'

const root = new nc.ComplexWidget([0, 0], [100, 100])
  .on('customEvent', (widget, x, y) => {
    console.log('Clicked!')
  })

const scene = new nc.Scene(root)
```