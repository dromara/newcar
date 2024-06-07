import type { CanvasKit } from 'canvaskit-wasm'
import { deepClone } from '@newcar/utils'
import type { Base } from './base'
import type { Widget } from './widget'

export interface AnimationContext<T extends Widget> {
  widget: T
  ck: CanvasKit
  elapsed: number
}

export function defineAnimationContext<T extends Widget>(context: AnimationContext<T>) {
  return context
}

export interface Animate<T extends Widget> {
  animate: (context: AnimationContext<T>) => boolean
  init?: (context: AnimationContext<T>) => void
  after?: (context: AnimationContext<T>) => void
}

export type AnimateExt<T extends Widget> = ReturnType<typeof defineAnimate<T>> & Animate<T>

export interface Animation<T extends Widget> {
  animate: Animate<T>
  finished: boolean
}

export function defineAnimate<T extends Widget>(animate: Animate<T>) {
  return {
    ...animate,
  }
}

export function sequence<T extends Base>(...animates: Animate<T>[]) {
  let seqDo: Animate<T>['after'] = (_ctx) => { }
  for (const animate of animates.reverse()) {
    seqDo = (ctx) => {
      ctx.widget.animate(animate)
      if (seqDo)
        seqDo(ctx)
    }
  }

  return defineAnimate<T>({
    init(ctx) {
      seqDo(ctx)
    },
    animate(_ctx) {
      return true
    },
  })
}

export function parallel<T extends Base>(...animates: Animate<T>[]) {
  return defineAnimate<T>({
    init(ctx) {
      for (const animate of animates) {
        if (animate.init)
          animate.init(ctx)
      }
    },
    after(ctx) {
      for (const animate of animates) {
        if (animate.after)
          animate.after(ctx)
      }
    },
    animate(ctx) {
      return animates
        .map(a => a.animate(ctx))
        .reduce((xs, x) => xs && x)
    },
  })
}

export function delay<T extends Base>(duration: number, animate: Animate<T>) {
  let startTime = 0
  let started = false

  return defineAnimate<T>({
    init(ctx) {
      startTime = ctx.elapsed
    },
    animate(ctx) {
      if (ctx.elapsed <= startTime + duration)
        return false
      if (!started && animate.init) {
        animate.init(ctx)
        started = true
      }
      return animate.animate(ctx)
    },
    after(ctx) {
      if (animate.after)
        animate.after(ctx)
    },
  })
}

export function changeProp<T extends Widget>(actor: Animate<T>['animate']) {
  return defineAnimate({
    animate: actor,
  })
}

export type TimingFunction = (process: number) => number
export const linear: TimingFunction = process => process
export function reverse(func: TimingFunction): TimingFunction {
  return process => func(1 - process)
}

export function withProcess<T extends Widget>(
  actor: ((ctx: AnimationContext<T>, process: number, origin: T) => void) | {
    init?: Animate<T>['init']
    animate: (ctx: AnimationContext<T>, process: number) => void
    after?: Animate<T>['after']
  },
) {
  const act = typeof actor === 'function' ? actor : actor.animate
  return (duration: number, by?: TimingFunction) => {
    let startAt = 0
    let origin: T
    by ??= linear
    return defineAnimate<T>({
      init: (context) => {
        startAt = context.elapsed
        origin = deepClone(context.widget)
        if (typeof actor !== 'function' && actor.init) {
          actor.init(context)
        }
      },
      animate: (context) => {
        if (context.elapsed > startAt + duration)
          return true

        const process = by((context.elapsed - startAt) / duration)
        act(context, process, origin)
        return false
      },
      after: (ctx) => {
        if (typeof actor !== 'function' && actor.after) {
          actor.after(ctx)
        }
      },
    })
  }
}
