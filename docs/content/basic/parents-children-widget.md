---
title: Parent-Child Widgets
---

<script setup lang="ts">
import { default as DemoChild } from './demos/parent-child-widgets/parents-widget.vue'
</script>

In `newcar`, objects can be nested using the `children` property. Here's how to add them:

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

In this case, the coordinates `(200, 300)` of `child` are not relative to the top-left corner of the canvas, but rather to the position of its parent component.

:::tip
In addition, parent-child components follow the principle of **"child follows parent, parent does not follow child"**. This means that when the parent component moves, the child component moves with it. When the child component moves, the parent component remains still.

With this feature, you can set up a background and make objects in the scene "child objects" of the background, so that when you manipulate the character's movement, the background moves backwards.
:::

:::info
Besides coordinates, **rotation angle** and **scaling ratio** also follow the parent-child component principle.

> The rotation angle here refers to the rotation angle of the entire coordinate system relative to the parent component, not the rotation angle value of each component.

:::

However, storing objects in variables is both cumbersome and inefficient, so after version 0.7.0, we recommend using chain syntax:

```javascript
const root = new Widget().add(new Circle(200).setUpdate((elapsed, widget) => {}))
```
