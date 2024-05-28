---
title: Basic Widget
---

# Basic Widget

Welcome to the development tutorial for Newcar extensions! 
In the previous documents, we introduced the basic concepts, design patterns, 
and how to use the basic components and other capabilities provided by Newcar to build your own application. 
Although Newcar provides a wealth of preset components and effects,
if there is no "customization", it will not only limit the expressive power of the application, but also sound too uncool, right? 

In this series of documents, we will focus on the advanced capabilities of Newcar and introduce how to achieve various custom effects in Newcar, whether simple or complex. 
They may not be the best, but they are ours! 

:::tip
By the way, if you have a great idea and want it to be part of Newcar, feel free to submit a PR to us! 
:::

The packages we need to use are:

- `@newcar/core` - The core package of Newcar
- `@newcar/basic` - The basic graphics package of Newcar
- `@newcar/utils` - The utility package of Newcar
- `canvaskit-wasm` - An old friend, the CanvasKit-WASM package

Install these packages in your project directory, and then let's start the journey of "custom" development!

:::tip
It is recommended to use TypeScript to get better type hints and experience!
:::

## What is `Widget`?

All our Widgets inherit (or indirectly inherit) from `Widget`, which is the core class of Newcar. 
In this class, we define the basic structure and methods of a Widget, including initialization, pre-drawing, and drawing.

When the Newcar kernel renders a Widget, it calls these methods to initialize the Widget, update properties, and draw the Widget.
Implementing a custom Widget is the process of implementing these methods!

Are you ready to start? Let's look at a simple example below.

## Basic structure

```typescript
import { Widget } from '@newcar/core'
import type { Canvas, CanvasKit } from 'canvaskit-wasm'

export interface MyWidgetOptions {
  style?: MyWidgetStyle
}

export interface MyWidgetStyle {}

export class MyWidget extends Widget {
  constructor(options?: MyWidgetOptions) {
    options ??= {} // Add a condition here to prevent users from passing empty options
    super(options)
  }

  // Initialize the Widget
  init(ck: CanvasKit) {
  }

  // Pre-draw, including updating on demand
  predraw(ck: CanvasKit, prop: string) {
  }

  // Draw
  draw(canvas: Canvas) {
  }
}
```

- `MyWidgetOptions` - Custom options for your Widget, including style
- `MyWidgetStyle` - Custom style for your Widget
- `MyWidget` - Your Widget class, which must inherit from `Widget`
  - `constructor` - Constructor, receives configuration options and performs some simple processing
  - `init` - Initialize, this method is called when the Widget is ready to be drawn
    - `ck` - The namespace of CanvasKit-WASM
  - `predraw` - Pre-draw, including updating on demand
    - `ck` - The namespace of CanvasKit-WASM
    - `prop` - The changed parameter
  - `draw` - Drawing function
    - `canvas` - The canvas object of CanvasKit-WASM

:::info
Want to know more about the CanvasKit-WASM package? Please refer to the [Skia official website](https://skia.org).
:::

## A simple example

A bit abstract? Well, let's implement a triangle now!

```typescript
import { Widget } from '@newcar/core'
import type { WidgetRange } from '@newcar/core'
import { Color } from '@newcar/utils'
import type { Canvas, CanvasKit, Paint, Path } from 'canvaskit-wasm'

export interface MyWidgetOptions {
  style?: MyWidgetStyle
}

export interface MyWidgetStyle {
  color: Color
}

export class MyWidget extends Widget {
  paint: Paint
  path: Path
  declare style: MyWidgetStyle

  constructor(
    public point1: [number, number],
    public point2: [number, number],
    public point3: [number, number],
    options?: MyWidgetOptions
  ) {
    options ??= {} // Add a condition here to prevent users from passing empty options
    options.style ??= {}
    super(options)
    this.style.color = options.style.color
  }

  // Initialize the Widget
  init(ck: CanvasKit) {
    this.paint = new ck.Paint()
    this.path = new ck.Path()
    // Pay special attention here, color need to be transformed as Float4
    this.paint.setColor(this.style.color.toFloat4())
    // What's more, the alpha imformation will be 
    // Another point to note is that the transparency is lost when the color is converted to Float4 format. 
    // We can reset the transparency using the setAlphaf method.
    this.paint.setAlphaf(this.style.color.alpha)
    this.paint.setStyle(ck.PaintStyle.Stroke)
  }

  // updating props on demand
  predraw(ck: CanvasKit, prop: string) {
    switch (prop) {
      case 'style.color': {
        // This is also the case
        this.paint.setColor(this.style.color.toFloat4())
        break
      }
      case 'point1':
      case 'point2':
      case 'point3': {
        this.path.moveTo(...this.point1)
        this.path.lineTo(...this.point2)
        this.path.lineTo(...this.point3)
        this.path.close()
      }
    }
  }

  // Draw
  draw(canvas: Canvas) {
    canvas.drawPath(this.path, this.paint)
  }
  
  calculateIn(x: number, y: number) {
    // Calculate whether the point is in the triangle (based on the self relative coordinate system)
    // This is a simple example, for basic shapes, you can use the built-in method of CanvasKit
    return this.path.contains(x, y)
  }
  
  calculateRange() {
    // Calculate the range of the triangle (based on the self relative coordinate system)
    // This is a simple example, for basic shapes, you can use the built-in method of CanvasKit
    const bounds = this.path.computeTightBounds()
    return [...bounds] as WidgetRange
  }
}
```

## Implementing calculation methods

In the example above, we added two calculation methods: `calculateIn` and `calculateRange`.
These two methods are used to calculate whether a point is in the triangle and the range of the triangle, respectively, 
and are used to calculate the interaction area of the Widget.

For basic shapes drawn with CanvasKit.Path, you can use the built-in methods of CanvasKit to calculate the interaction area.
More complex shapes may require custom calculation methods.

### Self-relative coordinate system

In the calculation methods, we use the self-relative coordinate system of the component, 
which means that we do not need to consider the position and transformation of the component, only the shape of the component itself.

In fact, the `isIn` and `range` methods of the component wrap our implementation, 
making it easier for us to calculate the interaction area of the component (without having to worry about other unrelated content).

## Conclusion

This article introduces the basic structure of a Widget and how to implement a simple triangle.
In the next article, we will introduce the "building blocks" approach to construct Widgets.
Stay tuned!
