import type { CanvasKit } from 'canvaskit-wasm'
import type { Widget } from './widget'
import type { Ref } from './prop'
import type { MaybeArray } from './utils'
import { normalize } from './utils'

// TODO: Rebuild needed!

export interface AnimationContext<T> {
  ck: CanvasKit
  elapsed: number
  widget: T
}

export interface Animation<T> {
  (ctx: AnimationContext<T>): boolean
}

export type Anim<T> = WithDep<() => boolean, AnimationContext<T>>

type TimingFunction = (process: number) => number
const linear: TimingFunction = p => p
export interface BasicAnimAttrs {
  process: number
  duration: number
  by?: TimingFunction
}
export interface Animate<T, A> {
  (ctx: AnimationContext<T> & BasicAnimAttrs & A): any
}
export type AnimateAttr<T, A> = AnimationContext<T> & BasicAnimAttrs & A

export type ExcludeFrom<A, B> = Pick<A, Exclude<keyof A, keyof B>>
export interface WithDep<T, A> {
  build: (attrs: A) => T
  with: <X>(pattrs: (
    (attrs: A) => X)) =>
  WithDep<T, ExcludeFrom<A, X>>
  withAttr: <X extends keyof A>(pattrs: {
    [K in X]?: A[K]
  }) => WithDep<T, ExcludeFrom<A, typeof pattrs>>
}
export function depend<T, A>(dependency: (attrs: A) => T): WithDep<T, A> {
  return {
    build: (attrs: A) => {
      return dependency(attrs)
    },
    withAttr: <X extends keyof A>(attrs: {
      [K in X]?: A[K]
    }) => {
      return depend<T, ExcludeFrom<A, typeof attrs>>((qattrs) => {
        return dependency(
          Object.assign(
            attrs,
            qattrs,
          ) as any,
        )
      })
    },
    with: <X>(pattrs: ((attrs: A) => X)) => {
      return depend<T, ExcludeFrom<A, X>>((qattrs) => {
        return dependency(
          Object.assign(
            pattrs(qattrs as any),
            qattrs,
          ) as any,
        )
      })
    },
  }
}

export function useAnimate<T extends Widget, A>(anim: Animate<T, A>) {
  let startTime = 0
  let called = false

  return depend<() => boolean, AnimateAttr<T, A>>((attrs) => {
    return () => {
      anim(attrs)

      return attrs.process >= 1
    }
  })
    .with<{ process: number }>(({ duration, elapsed, by }) => {
      const fn = by || linear
      if (!called) {
        startTime = elapsed
        called = true

        return {
          process: 0,
        }
      }
      else {
        return {
          process: fn((elapsed - startTime) / duration),
        }
      }
    })
}

export function withHook<T extends Widget, A>({
  before,
  animate,
  after,
}: {
  before?: Animate<T, A>
  animate: Animate<T, A>
  after?: Animate<T, A>
}) {
  let called = false
  return useAnimate<T, A>((ctx) => {
    if (!called) {
      if (before)
        before(ctx)
      called = true
    }
    animate(ctx)
    if (ctx.process >= 1) {
      if (after)
        after(ctx)
    }
  })
}

export function changeProperty<T extends Widget>(
  propsToChange: (widget: T) => MaybeArray<Ref<number>>,
) {
  let called = false
  let a: {
    original: number[]
  }

  return useAnimate<T, {
    changed: Ref<number>[]
    original: number[]
    from?: MaybeArray<number>
    to: MaybeArray<number>
  }>((ctx) => {
    const from = ctx.from ? normalize(ctx.from) : ctx.original
    for (const index in ctx.changed) {
      const rto = normalize(ctx.to)
      ctx.changed[index].value += ctx.process * (rto[index] - from[index])
    }
  })
    .with<{ original: number[], changed: Ref<number>[] }>((ctx) => {
      if (!called) {
        a = {
          original: normalize(propsToChange(ctx.widget)).map(x => x.value),
        }
        called = true
      }

      return Object.assign(a, { changed: normalize(propsToChange(ctx.widget)) })
    })
}

export function parallel<T extends Widget>(...anims: Anim<T>[]) {
  return depend<() => boolean, AnimationContext<T>>((ctx) => {
    return () => {
      const res = anims.map(a => a.build(ctx)())
      anims = res.filter(r => !r).map((_, i) => anims[i])

      return res.reduce((x, xs) => x || xs)
    }
  })
}

export function sequence<T extends Widget>(...anims: Anim<T>[]) {
  return depend<() => boolean, AnimationContext<T>>((ctx) => {
    return () => {
      if (anims.length === 0) {
        return true
      }
      if (anims[0].build(ctx)()) {
        anims.shift()
      }

      return false
    }
  })
}
export function delay<T extends Widget>(duration: number) {
  return useAnimate<T, unknown>((_) => {}).withAttr({ duration })
}
export function timeline<T extends Widget>(...lines: [
  number,
  number,
  WithDep<() => boolean, { duration: number } & AnimationContext<T>>,
][]) {
  return parallel(
    ...lines.map(([d, duration, a]) =>
      sequence(delay(d), a.withAttr({ duration }) as any),
    ),
  )
}
