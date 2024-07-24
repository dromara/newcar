---
title: Text and TextGroup
---

<script setup lang="ts">
import { default as DemoText } from './demos/demo-text.vue'
import { default as DemoTextGroup } from './demos/demo-text-group.vue'
</script>

# `Text` and `TextGroup`

## `Text`

The `Text` component is used to add text to the chart, supports text style settings, and text layout settings.

We need to preload a font first, please refer to [Resource Preloading](../../basic/preload), and then we can use the `Text` component to add text.

When using the `Text` component, we need to estimate and set the maximum width of the text (container width), which is `100` by default.

```ts
import * as nc from 'newcar'

// Omit some code

widget.add(
  new nc.Text('Hello world!', {
    x: 100,
    y: 100,
    style: {
      fontSize: 50
    },
    width: 500
  }),
)

// Omit some code

```

<DemoText/>

## `TextGroup`

`TextGroup` is a collection of text, it contains multiple `Text` components, and supports more layout settings.

```ts
import * as nc from 'newcar'

// Omit some code

widget.add(
  new nc.TextGroup([
    new nc.Text('Hello', {
      x: 100,
      y: 100,
      style: {
        fontSize: 50,
        fill: false,
        border: true,
      }
    }),
    new nc.Text(' world!', {
      x: 100,
      y: 150,
      style: {
        fontSize: 30,
        fill: false,
        border: true,
      }
    }),
      // ...
  ], {
    width: 600,
    x: 200,
    y: 200
  })
)

// Omit some code

```

<DemoTextGroup/>

## See Also:

- [Resource Preloading](../../basic/preload)
- [`Text`](https://apis.newcarjs.org/classes/newcar.text)
- [`TextGroup`](https://apis.newcarjs.org/classes/newcar.textgroup)
