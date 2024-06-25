import type { CanvasKit } from 'canvaskit-wasm'
import type { Widget } from './widget'

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
