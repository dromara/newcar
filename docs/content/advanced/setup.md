---
title: Setup Syntax
---

# Setup Syntax

Have you ever felt that using Newcar to create animations is too cumbersome? After version 1.0.0-beta, we added the setup syntax to give users more flexibility.

## Generator Function

First, we need to call the `Widget.setup()` method and pass in a [generator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#generator_functions), which will be the entry point for your logical code. The first parameter is the `Widget` instance.

```ts
import * as nc from 'newcar'

new Widget({
  x: 100,
  y: 100
}).setup(function* (widget) {
  console.log(widget.x, widget.y)
  // Output: 100 100
})
```

## Waiting

When we want to pause the animation for a few seconds, milliseconds, or frames, we can use the `yield` keyword to return a number.

```ts
import * as nc from 'newcar'
new Widget({
  x: 100,
  y: 100
}).setup(function* (widget) {
  yield 1 // Wait for 1 second
  widget.x = 100
  yield 3 // Wait for 3 seconds
  widget.x = 200
})
```

## Animation

How do we insert animations? We provide an API called `animate`, which is a function that can only be used within the setup function and does not require passing in the start time of the animation.

```ts
import * as nc from 'newcar'

new Widget({
  x: 100,
  y: 100
}).setup(function* (widget) {
  yield 1
  yield animate(nc.create, 10)
})
```

This code will execute the `create` animation after 1 second.

By default, animations are executed synchronously. You can also use a "pseudo-asynchronous" approach to execute multiple animations in the same time period, as shown in the following code.

```ts
import * as nc from 'newcar'

new Widget({
  x: 100,
  y: 100
}).setup(function* (widget) {
  yield animate(nc.create, 10).setAsync()
  yield animate(nc.move, 10, {
    from: [0, 0],
    to: [200, 200]
  }).setAsync()
})
```

This code will execute two animations simultaneously.