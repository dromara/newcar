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

export type TimingFunction = (process: number) => number
export const linear: TimingFunction = p => p
export interface BasicAnimAttrs {
  process: number
  duration: number
  by?: TimingFunction
}
export interface Animate<T, A> {
  (ctx: AnimationContext<T> & BasicAnimAttrs & A): any
}
export type AnimateAttr<T, A> = Parameters<Animate<T, A>>[0]

export interface WithDep<T, A> {
  build: (attrs: A) => T
  with: <X>(pattrs: ((attrs: Pick<A, Exclude<keyof A, keyof X>>) => X)) => WithDep<T, Pick<A, Exclude<keyof A, keyof X>>>
}
export function depend<T, A>(dependency: (attrs: A) => T): WithDep<T, A> {
  return {
    build: (attrs: A) => {
      return dependency(attrs)
    },
    with: <X>(pattrs: (attrs: Pick<A, Exclude<keyof A, keyof X>>) => X) => {
      return depend<T, Pick<A, Exclude<keyof A, keyof X>>>((qattrs) => {
        return dependency(Object.assign(pattrs(qattrs), qattrs) as any)
      })
    },
  }
}

export function initial<A, X>(
  injector: (ctx: Pick<A, Exclude<keyof A, keyof X>>) => X,
) {
  let initial: X
  let called = false
  return (ctx: Pick<A, Exclude<keyof A, keyof X>>) => {
    if (!called) {
      initial = injector(ctx)
      called = true
    }
    return initial
  }
}

export function useAnimate<T extends Widget, A>(anim: Animate<T, A>) {
  let startTime = 0
  let called = false

  return depend<Animation<T>, AnimateAttr<T, A>>((attrs) => {
    return (ctx) => {
      anim(Object.assign(attrs, ctx))

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
