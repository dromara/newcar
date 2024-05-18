---
title: Basic Component
---

# Basic Component

Welcome to the development tutorial for Newcar extensions! We will gradually explain the development approach for Newcar extensions so that everyone can develop Newcar extensions more effectively!

The packages we need to use are:

- `@newcar/core` - The core package of Newcar
- `@newcar/basic` - The basic graphics package of Newcar
- `@newcar/utils` - The utility package of Newcar
- `canvaskit-wasm` - An old friend, the CanvasKit-WASM package

Install these two packages in your project directory, and then you can start developing Widgets!

All our Widgets should extend `Widget`, which defines some methods for the kernel to operate on them and for you to implement.

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
    super(options)
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
    super(options)
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

## Add calculation methods

In the above example, we added two calculation methods: `calculateIn` and `calculateRange`. These two methods are used to calculate whether a point is in the triangle and the range of the triangle, respectively. These two methods are used to calculate the interaction area of the Widget.

For basic shapes drawn with CanvasKit.Path, you can use the built-in methods of CanvasKit to calculate the interaction area. More complex shapes may require custom calculation methods.

### Self-relative coordinate system

In the calculation methods, we use the self-relative coordinate system of the component. This means that we do not need to consider the position and transformation of the component, only the shape of the component itself.

In fact, the `isIn` and `range` methods of the component wrap our implementation, making it easier for us to calculate the interaction area of the component (without having to worry about other unrelated content).

## Conclusion

This article introduces the basic structure of a Widget and how to implement a simple triangle. In the next article, we will introduce the "building blocks" approach to construct Widgets. Stay tuned!