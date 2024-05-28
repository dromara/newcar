---
title: Composite Widget
---

// Workign in progress. Please refer to the Chinese version for the latest content. (zh/dev/composite-widget.md复合组件)

# Composite Widget

Have you understood the basic Widgets? However, drawing graphics using CanvasKit is not only challenging but also cumbersome. I mean, it's mainly because it's cumbersome.
After all, it's too troublesome to calculate the position, size, and color of each graphic by yourself. A slightly more complex graphic will completely turn into a math problem, which doesn't look elegant at all.
Next, we will introduce Newcar's design philosophy - "building blocks"!

\- By combining some basic Widgets together, a complex graphic can be implemented step by step!

## Widget Composition - `add` Method

```typescript
export class CompositeWidget extends Widget {
  constructor(/** omitted */) {
    super(/** omitted */);
    this.add(new Widget(/** omitted */))
  }
}
```

First, let's declare a new component `CompositeWidget` that inherits from `Widget`, and then call the `add` method in the constructor - a new Widget is added!

It's simple, right? This is all we need to know. Next, we will demonstrate how to use the `add` method with a simple example.

## A Simple Example

Next, let's get our hands dirty and implement an arrow:

```typescript
import type { CanvasKit } from 'canvaskit-wasm'
import type { Vector2 } from '../../utils/vector2'
import type { FigureOptions, FigureStyle } from './figure'
import { Figure } from './figure'
import { Polygon } from './polygon'
import { Line } from './line'
import { Widget } from '@newcar/core'

/**
 * Calculates the rotation angle for an arrow based on the line's start and end points,
 * with the angle expressed in degrees. The angle is calculated with respect
 * to the horizontal axis pointing to the right.
 *
 * @param startPoint The starting point of the line.
 * @param endPoint The ending point of the line.
 * @returns The rotation angle in degrees, where 0 degrees points to the right (east),
 * and positive angles are measured clockwise.
 */

function calculateArrowRotationAngle(
  startPoint: Vector2,
  endPoint: Vector2,
): number {
  // Calculate the differences in the x and y coordinates
  const dx = endPoint[0] - startPoint[0]
  const dy = endPoint[1] - startPoint[1]
  // Calculate the angle in radians using Math.atan2(dy, dx)
  const angleRadians = Math.atan2(dy, dx)
  // Convert the angle to degrees
  let angleDegrees = angleRadians * (180 / Math.PI)
  // Normalize the angle to the range [0, 360)
  if (angleDegrees < 0)
    angleDegrees += 360
  return angleDegrees
}

export interface ArrowOptions extends FigureOptions {
  style?: ArrowStyle
}

export interface ArrowStyle extends FigureStyle {}

export class Arrow extends Figure {
  private tip: Polygon
  private trim: Line
  radian: number

  constructor(
    public from: Vector2,
    public to: Vector2,
    options?: ArrowOptions,
  ) {
    options ??= {}
    super(options)
    this.radian = calculateArrowRotationAngle(this.from, this.to)
    this.tip = new Polygon(
      [
        [0, 10],
        [22, 0],
        [0, -10],
      ],
      {
        x: this.to[0],
        y: this.to[1],
        style: {
          scaleX: this.from[0] > this.to[0] ? -1 : 1,
          scaleY: this.from[1] > this.to[1] ? -1 : 1,
          rotation: this.radian,
          ...this.style,
        },
        progress: this.progress,
      },
    )

    this.trim = new Line(this.from, this.to, {
      style: {
        color: this.style.borderColor,
        width: this.style.borderWidth,
        ...this.style,
      },
      progress: this.progress,
    })

    this.add(this.trim, this.tip)
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    switch (propertyChanged) {
      case 'from':
      case 'to': {
        this.radian = calculateArrowRotationAngle(this.from, this.to)
        this.tip.style.rotation = this.radian
        this.trim.from = this.from
        this.trim.to = this.to
        break
      }
      case 'progress': {
        this.tip.progress = this.progress
        this.trim.progress = this.progress
        break
      }
      case 'style.transparency': {
        this.tip.style.transparency = this.style.transparency
        this.trim.style.transparency = this.style.transparency
        break
      }
      case 'style.offset':
      case 'style.interval': {
        this.tip.style.offset = this.style.offset
        this.tip.style.interval = this.style.interval
      }
    }
  }
}
```

In the code above, we added `trim` (the shaft of the arrow) and `tip` (the tip of the arrow) to the arrow component, and then set their sizes, positions, and styles appropriately
\- this way, we have implemented an arrow component!

:::tip
Please create and add child components in the `constructor`, because `init` will only be called after the animation is played, so there may be a certain chance of an error.
:::

### Calculation Methods

You may wonder why the `calculateIn` and `calculateRange` methods mentioned in the previous section are not present here. This is because the default wrapping of `Widget` will automatically handle the calculation of child components. Only when the current component has independently drawn content do you need to implement these two methods separately (and only consider the independently drawn parts!).
