import type { BlendMode } from '@newcar/utils'
import type { Canvas } from 'canvaskit-wasm'
import type { Widget } from './widget'
import { defineWidgetBuilder } from './widget'
import type { Animate } from './animation'
import type { ConvertToProp, Prop } from './prop'
import { def } from './prop'

export interface BaseOptions {
  style?: BaseStyle
  x?: number
  y?: number
  centerX?: number // The rotation center x of the widget.
  centerY?: number // The rotation center y of the widget.
  progress?: number
  children?: Widget[]
  live?: boolean
  display?: boolean
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
  animates: Animate<any>[]
  live: Prop<boolean>
  display: Prop<boolean>
  style: ConvertToProp<BaseStyle>
  children: Widget[]
  add: (...children: Widget[]) => Base
  animate: <T extends Widget>(animate: Animate<T>) => Base
  born: () => Base
  kill: () => Base
  show: () => Base
  hide: () => Base
}

export function createBase(options: BaseOptions) {
  return defineWidgetBuilder<Base>((ck) => {
    options ??= {}
    options.style ??= {}

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
    const live = def(options.live ?? true)
    const display = def(options.display ?? true)

    let current: Animate<any> | undefined

    function render(_canvas: Canvas) {
      // ...
    }

    return {
      x,
      y,
      centerX,
      centerY,
      progress,
      style,
      children,
      animates,
      render,
      live,
      display,

      add(...children: Widget[]) {
        this.children.push(...children)
        return this
      },
      animate<T extends Widget>(animate: Animate<T>) {
        this.animates.push(animate)
        return this
      },
      born() {
        this.live.value = true

        return this
      },
      kill() {
        this.live.value = false

        return this
      },
      show() {
        this.display.value = true

        return this
      },
      hide() {
        this.display.value = false

        return this
      },
      update(canvas: Canvas, elapsed: number, renderFunction: (canvas: Canvas) => any) {
        if (!live.value)
          return
        canvas.save()
        const ctx = {
          widget: this,
          elapsed,
          ck,
        }
        if (!current) {
          current = animates.shift() as Animate<any>
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
        canvas.translate(x.value, y.value)
        canvas.rotate(style.rotation.value, centerX.value, centerY.value)
        canvas.scale(style.scaleX.value, style.scaleY.value)
        for (const child of children) {
          child.update(canvas, elapsed, child.render)
        }
        if (display.value)
          renderFunction(canvas)
        // console.log(renderFunction.toString())
        canvas.restore()
      },
    }
  })
}
