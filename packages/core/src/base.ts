import type { BlendMode } from '@newcar/utils'
import type { Canvas } from 'canvaskit-wasm'
import type { Widget } from './widget'
import { defineWidgetBuilder } from './widget'
import type { Animate } from './animation'
import { defineAnimationContext } from './animation'
import type { ConvertToProp, Prop } from './prop'
import { changed, def } from './prop'

export interface BaseOptions {
  style?: BaseStyle
  x?: number
  y?: number
  centerX?: number // The rotation center x of the widget.
  centerY?: number // The rotation center y of the widget.
  progress?: number
  children?: Widget[]
}

export interface BaseStyle {
  scaleX?: number
  scaleY?: number
  rotation?: number
  transparency?: number
  blendMode?: BlendMode
  antiAlias?: boolean
}

export interface Base extends Widget {
  x: Prop<number>
  y: Prop<number>
  centerX: Prop<number>
  centerY: Prop<number>
  progress: Prop<number>
  style: ConvertToProp<BaseStyle>
  children: Widget[]
  add: (...children: Widget[]) => Base
  animate: <T extends Widget>(animate: Animate<T>) => Base
}

export function createBase(options: BaseOptions) {
  return defineWidgetBuilder<Base>((ck) => {
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

    function render(_canvas: Canvas) {
      // ...
    }

    return {
      ...options,
      x,
      y,
      centerX,
      centerY,
      progress,
      style,
      children,
      render,
      add(...children: Widget[]) {
        children.push(...children)
        return this
      },
      animate<T extends Widget>(animate: Animate<T>) {
        animates.push(animate)
        return this
      },
      update(canvas: Canvas, elapsed: number, renderFunction: (canvas: Canvas) => any) {
        canvas.save()
        const ctx = defineAnimationContext({
          widget: this,
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
        for (const child of children) {
          child.update(canvas, elapsed, child.render)
        }
        canvas.translate(x.value, y.value)
        canvas.rotate(style.rotation.value, centerX.value, centerY.value)
        canvas.scale(style.scaleX.value, style.scaleY.value)
        renderFunction(canvas)
        canvas.restore()
      },
    }
  })
}
