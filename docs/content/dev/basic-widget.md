---
title: Component Basics
---

# Component Basics

Welcome to the development tutorial for Newcar extensions! We will gradually explain the development approach for Newcar extensions so that everyone can develop Newcar extensions more effectively!

The packages we need to use are:

- `@newcar/core` - The core package of Newcar
- `@newcar/basic` - The basic graphics package of Newcar
- `@newcar/utils` - The utility package of Newcar
- `canvaskit-wasm` - An old friend, the CanvasKit-WASM package

Install these two packages in your project directory, and then you can start developing Widgets!

All our Widgets are based on the `Widget` class, which defines some methods for the kernel to operate on them.

## The most basic structure

To provide users with a more complete type experience, we recommend using TypeScript instead of JavaScript for development.

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
  }

  // Initialize the Widget
  init(ck: CanvasKit) {}

  // Pre-draw, including updating on demand
  predraw(ck: CanvasKit, prop: string) {}

  // Draw
  draw(canvas: Canvas) {}
}
```

- `MyWidgetOptions` - Custom options for the Widget, including style
- `MyWidgetStyle` - Custom style for the Widget
- `MyWidget` - The body of the custom Widget
  - `init` - Initialize
    - `ck` - The namespace of CanvasKit-WASM
  - `predraw` - Pre-draw, including updating on demand
    - `ck` - The namespace of CanvasKit-WASM
    - `prop` - The changed parameter
  - `draw` - Drawing function
    - `canvas` - The canvas object of CanvasKit-WASM

For the use of CanvasKit-WASM, please refer to the [Skia official website](https://skia.org).

Now let's implement a triangle:

```typescript
import { Widget } from '@newcar/core'
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
    this.style.color = options.style.color
  }

  // Initialize the Widget
  init(ck: CanvasKit) {
    this.paint = new ck.Paint()
    this.path = new ck.Path()
    // Pay special attention here, it needs to be converted to Float4 format
    this.paint.setColor(this.style.color.toFloat4())
    this.paint.setStyle(ck.PaintStyle.Stroke)
  }

  // Pre-draw, including updating on demand
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
}
```

CanvasKit has many similarities to native Canvas2d. You can refer to the Skia API for development. Of course, we recommend using the "building blocks" approach to construct our Widgets. Please see the next article for details.
