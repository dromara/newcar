---
title: Text and TextGroup
---

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
      color: nc.Color.parse('skyblue'),
      fontSize: 50
    },
    width: 500
  }),
)

// Omit some code

```

![The demonstration of the Text component, the sky blue "Hello world!"](/basic/text-and-textgroup-01.png)

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
        color: nc.Color.parse('skyblue'),
        fontSize: 50
      }
    }),
    new nc.Text(' world!', {
      x: 100,
      y: 150,
      style: {
        color: nc.Color.parse('red'),
        fontSize: 30
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

![The demonstration of the TextGroup component, the sky blue "Hello" and the red " world!"](/basic/text-and-textgroup-02.png)

## See Also:

- [Resource Preloading](../../basic/preload)
- [`Text`](https://apis.newcarjs.org/classes/newcar.text)
- [`TextGroup`](https://apis.newcarjs.org/classes/newcar.textgroup)
