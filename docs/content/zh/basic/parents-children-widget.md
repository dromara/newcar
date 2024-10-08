---
title: 父子组件
---

<script setup lang="ts">
import { default as DemoChild } from '../../basic/demos/parent-child-widgets/parents-widget.vue'
</script>

# 父子组件

在 `newcar` ，可以使用 `children` 属性嵌套组件。添加方法如下：

```javascript
const child = new nc.Circle(100, {
  x: 103,
  y: 103,
  style:{
    border:true,
    borderColor:nc.Color.BLACK,
    borderWidth:3
  }
  })

const father = new nc.Circle(300, {
  x: 303,
  y: 303,
  style:{
    border:true,
    borderColor:nc.Color.BLACK,
    borderWidth:3
  }
})

// Add child Widget
father.add(child)
```

<DemoChild/>

在本例中， `child` 的坐标 `（103， 103）` 不是相对于画布的左上角，而是基于其父组件的相对位置。

:::tip
此外，父子组件遵循 **“子跟随父，父不跟随子”** 的原则。这意味着，当父组件移动时，子组件也会随之移动。当子组件移动时，父组件将保持静止。

使用此功能，您可以设置背景并使场景中的对象成为背景的 `“子对象”` ，这样当您操纵组件的移动时，背景会向后移动。
:::

:::info
除了坐标外，**旋转角度** 和 **缩放比例** 也遵循父子继承原则。

> 这里的旋转角度是指整个坐标系相对于父分量的旋转角度，而不是每个分量的旋转角度值。

:::

但是，在变量中存储对象既麻烦又效率低下，因此在 0.7.0 版本之后，我们建议使用链式语法：

```javascript
const root = new Widget().add(new Circle(200).setUpdate((elapsed, widget) => {}))
```
