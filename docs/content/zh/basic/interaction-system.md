---
title: 交互系统
---

<script setup lang="ts">
import { default as DemoClick } from '../../basic/demos/interaction-system/click.vue'
</script>

# 交互系统

有没有想过在你的Newcar动画中添加一些更多的动态内容？
例如单击一个正方形以切换到下一个场景，或者当您将鼠标悬停在组件上面时将其放大？
交互系统可以使您做到这一切。

在 `1.0.0-alpha.0` 版本中，我们正式发布了交互系统。
使用它来您可以使您的动画更像 Flash。

下面是一个简单的例子：
当您单击方块时，将会显示弹窗，并且控制台中将打印出 `Clicked!!`

```typescript
import * as nc from 'newcar'

const root = new nc.Rect(100, 100,{x:100})
  .on(nc.click, (widget, x, y) => {
    console.log('Clicked!')
    alert("Clicked!");
  })

const scene = new nc.Scene(root)
```
<DemoClick/>

尝试去打开控制台， 并且点击它吧！

## 内置事件

此外，Newcar 还有许多不同的内置事件供您选择，例如：

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
- ……more events are still in development. You can also customize events according to the methods in [Common Events](../dev/common-event). PRs are welcome!

## Widget 事件

在 Newcar 中，一些复杂的小部件可能会触发它们自己的自定义事件。
您可以使用 `on` 方法通过传入事件名称来侦听这些事件，例如：

```typescript
import * as nc from 'newcar'

const root = new nc.ComplexWidget([0, 0], [100, 100])
  .on('customEvent', (widget, x, y) => {
    console.log('Clicked!')
  })

const scene = new nc.Scene(root)
```