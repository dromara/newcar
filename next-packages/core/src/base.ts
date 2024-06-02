import type { BlendMode } from '@newcar/utils'
import type { Canvas } from 'canvaskit-wasm'
import type { Prop, Widget } from './widget'
import { def, defineWidgetBuilder } from './widget'
import type { Animate } from './animation'
import { defineAnimationContext } from './animation'

export interface WidgetOptions {
  style?: WidgetStyle
  x?: number
  y?: number
  centerX?: number // The rotation center x of the widget.
  centerY?: number // The rotation center y of the widget.
  progress?: number
  children?: Widget[]
}

export interface WidgetStyle {
  scaleX?: number
  scaleY?: number
  rotation?: number
  transparency?: number
  blendMode?: BlendMode
  antiAlias?: boolean
}

export function createBase(options: WidgetOptions) {
  return defineWidgetBuilder((ck) => {
    const animates: Animate<any>[] = []
    const children: Widget[] = []
    const x = def(options.x ?? 0)
    const y = def(options.y ?? 0)
    const centerX = def(options.centerX ?? 0)
    const centerY = def(options.centerY ?? 0)
    const progress = def(options.progress ?? 1)
    const style = {
      scaleX: def(options.style?.scaleX ?? 1),
      scaleY: def(options.style?.scaleY ?? 1),
      rotation: def(options.style?.rotation ?? 0),
      transparency: def(options.style?.transparency ?? 1),
      blendMode: def(options.style?.blendMode ?? 'srcOver'),
      antiAlias: def(options.style?.antiAlias ?? true),
    }

    let current: Animate<any> | undefined

    function add(...children: Widget[]) {
      children.push(...children)
    }

    function animate<T extends Widget>(animate: Animate<T>) {
      animates.push(animate)
    }
    const base = {
      ...options,
      x,
      y,
      centerX,
      centerY,
      progress,
      style,
      children,
      add,
      animate,
      render,
    }

    function render(canvas: Canvas, elapsed: number) {
      const ctx = defineAnimationContext({
        widget: base as any,
        elapsed,
        ck,
      })
      if (!current) {
        current = animates.shift() as any
        if (current && current.init) {
          current.init(ctx)
        }
      }
      else {
        const finished = current.animate(ctx)
        if (finished) {
          if (current.after)
            current.after(ctx)
          current = undefined
        }
      }
      canvas.save()
      canvas.translate(x.value, y.value)
      canvas.rotate(style.rotation.value, centerX.value, centerY.value)
      canvas.scale(style.scaleX.value, style.scaleY.value)
      for (const child of children) {
        child.render(canvas, elapsed)
      }
      canvas.restore()
    }

    return base
  })
}

export type Base = ReturnType<ReturnType<typeof createBase>>
