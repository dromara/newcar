---
title: Interaction System
---

<script setup lang="ts">
import { default as DemoClick } from './demos/interaction-system/click.vue'
</script>

# Interaction System

Have you ever thought about adding some more dynamic content to your Newcar animations?
Like clicking a square to switch to the next scene, or having a shape enlarged when you hover the mouse over it?
The interaction system can make all your fantasies about this come true.

In version `1.0.0-alpha.0`, we officially released the interaction system.
You can use it to make your animations feel like Flash.

Here is a simple example:
When you click on this square, you will see a pop-up window will be displayed, `Clicked!` will be printed in the console:

```typescript
import * as nc from 'newcar'

const root = new nc.Rect(100, 100,
  {
    x:3,
    y:3,
    style:{
      border:true,
      borderColor:nc.Color.BLACK,
      borderWidth:3
    }
  })

const scene = new nc.Scene(root)
```
<DemoClick/>

Try opening the console and clicking on it!

## Built-in Events

In addition, Newcar has many different built-in events for you to choose from, such as:

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

## Widget Events

In Newcar, some complex widgets may trigger their own custom events.
You can also use the `on` method to listen for these events by passing in the event name string, such as:

```typescript
import * as nc from 'newcar'

const root = new nc.ComplexWidget(......)
  .on('customEvent', (widget, x, y) => {
    console.log('Clicked!')
    alert("Clicked!");
  })

const scene = new nc.Scene(root)
```