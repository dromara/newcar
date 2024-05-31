---
title: Advanced Animation
---

# Advanced Animation

We have learned how to define simple property animations using `changeProperty` and `changeStyle`, 
which allows us to easily implement classic and simple animation effects like `fadeIn`.
However, simple property animations still look a bit monotonous. 
Through `defineAnimation`, Newcar provides a more flexible way to define animations, 
allowing us to implement more complex animation effects.

## `defineAnimation`

First, we need to import a function that defines animations:

```typescript
import { defineAnimation } from '@newcar/core'
```

This function takes a parameter that implements the `Animation` interface and returns an `Animation` object, 
which, like the `changeProperty` and `changeStyle` we learned before, 
can be passed as a parameter to `Widget.animate` to define the animation effect.

```typescript
export function defineAnimation<T extends Widget>(
  animation: Animation<T> & Record<string, any>,
): Animation<T> {
  return animation
}
```

## `Animation` Interface

The `Animation` interface is defined as follows:

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

The `Animation` interface defines three methods:

- `act`: The action of this animation when it's in his lifecycle. 
  It is called every frame, and `process` represents the progress of the animation, with a value range of [0, 1].
- `init`: The initialization method of the animation, called when the animation starts.
- `after`: Called when the animation ends.

The `act` method is required to be implemented, while the `init` and `after` methods are optional, 
which are usually used when adding child components or cleaning up resources. 
Let's take a look at an example:

## Define an Animation Using `defineAnimation`

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

In this example, we define an animation `showCreationThenDestructionAround`, which creates a rectangle outside the widget, 
then draws the stroke animation for entering and exiting, and finally destroys the rectangle.

Let's follow the instantiation of the animation to see how this animation is implemented:

### Instantiate the Animation

When we call `widget.animate(showCreationThenDestructionAround, 1, 1)`, 
`showCreationThenDestructionAround` will be instantiated as an `AnimationInstance` and added to the animation queue of `widget` for playback.

When `widget` is rendered, the animation queue of `widget` will be traversed, and the `init` method will be called in turn.

In the example above, the `init` method will create a rectangle `this.rect` and add it to `widget`.

:::tip
Confused about `this`? `this` points to `AnimationInstance`, and you can add properties to `this` to use in `act` and `after` methods.

In the example above, we use `this.rect` to store the reference of the `Rect` component and `this.c` to store the perimeter of the rectangle.
:::

The `init` method receives the following parameters:

- `widget`: The target component of the animation.
- `startAt`: The time when the animation starts. 
This parameter is generally used when we want to combine other basic animations into complex animations (Note: The animation should be considered initialized at 0 seconds).
- `duration`: The duration of the animation.
- `ck`: CanvasKit instance.
- `params`: The parameters of the animation, which are the third parameter passed when we call `widget.animate`.

:::tip
The `init` method is optional. If your animation does not need initialization, you can skip this method.

In general, the progress of the animation should be calculated based on the `process` parameter passed to the `act` method, 
rather than the `elapsed`, `startAt`, `duration`, and other parameters.
:::

### Execute the Animation

When `widget` is updated, the animation queue of `widget` will be traversed, and the `act` method will be called in turn.

In the example above, the `act` method will set the stroke width of the rectangle based on the `process` parameter to implement the enter and exit animation of the rectangle.

The `act` method receives the following parameters:

- `widget`: The target component of the animation.
- `elapsed`: The time the animation has been running.
- `process`: The progress of the animation, with a value range of [0, 1].
- `duration`: The duration of the animation, which is generally used when we want to combine other basic animations into complex animations.
- `ck`: CanvasKit instance.
- `params`: The parameters of the animation, which are the third parameter passed when we call `widget.animate`.

### End the Animation

When the animation ends, the `after` method will be called.

In the example above, we destroy the rectangle `this.rect` in the `after` method.

The `after` method receives the following parameters:

- `widget`: The target component of the animation.
- `elapsed`: The time the animation has been running.
- `ck`: CanvasKit instance.
- `params`: The parameters of the animation, which are the third parameter passed when we call `widget.animate`.

:::tip
The `after` method is optional. If your animation does not need to clean up resources, you can skip this method.

It is worth noting that the `after` method may be called repeatedly after the animation ends, 
so please ensure that your `after` method is idempotent.
:::
