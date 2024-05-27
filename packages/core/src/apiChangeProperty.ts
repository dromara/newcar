import * as ac from 'acorn'
import type { CanvasKit } from 'canvaskit-wasm'
import type { Widget } from './widget'
import type { Animation } from './animation'
import { defineAnimation } from './animation'
import type { MaybeArray, PickNumberKeys } from './types'
import { deepClone } from './utils/deepClone'

/**
 * Easing function type, which takes a progress ratio and returns an adjusted ratio.
 */
type EasingFunction = (progress: number) => number

// TODO: error handling
function parseProperty(propName: ac.Expression): string[] {
  let chain: string[] = []
  const e = propName

  switch (e.type) {
    case 'Identifier':
      chain.push(e.name)

      break
    case 'MemberExpression':
      if (e.object.type === 'MemberExpression') {
        chain = parseProperty(e.object).concat(chain)
      }
      else if (e.object.type === 'Identifier') {
        chain.push(e.object.name)

        switch (e.property.type) {
          case 'Literal':
            chain.push(e.property.value.toString())

            break
          case 'Identifier':
            chain.push(e.property.name)
            break
          default:
            return []
        }
      }
      else {
        return []
      }

      break
    default:
      return []
  }

  return chain
}

function setByChain(chain: string[], object: any, value: any): void {
  if (chain.length === 0)
    return

  const prop = chain.shift()
  if (chain.length === 0) {
    object[prop] = value
  }
  else {
    if (object[prop] === undefined)
      object[prop] = {}

    setByChain(chain, object[prop], value)
  }
  // console.log(object[prop])
}

function getByChain(chain: string[], object: any): any {
  const prop = chain.shift()
  const des = Object.getOwnPropertyDescriptor(object, prop)
  if (des === undefined)
    return undefined
  if (chain.length === 0)
    return des.value
  else
    return getByChain(chain, des.value)
}

function normalizeMaybeArray<T>(ma: MaybeArray<T>): T[] {
  return Array.isArray(ma) ? ma : [ma]
}

/**
 * Creates an animation that changes one or more properties of a widget over time.
 * The `from` and `to` values are either provided directly or through `params` when calling `Widget.animate`.
 * Additionally, an easing function can be provided either directly or through `params` to adjust the animation progress.
 * @param propertyName The name of the property or array of properties to change.
 * @param defaultFrom Optional default starting value or array of starting values for the property/properties.
 * @param defaultTo Optional default ending value or array of ending values for the property/properties.
 * @param by Optional easing function to adjust the animation progress, can be overridden by params.by.
 * @returns An Animation object.
 */
export function changeProperty<T extends Widget>(
  propertyName: MaybeArray<PickNumberKeys<T>>,
  defaultFrom?: MaybeArray<number>,
  defaultTo?: MaybeArray<number>,
  by?: EasingFunction,
): Animation<T> {
  let called = false
  let from: number[]
  let to: number[]
  const propertyNames = normalizeMaybeArray(propertyName)
  const propChains = propertyNames.map((p) => {
    const s = ac.parse(p as string, { ecmaVersion: 'latest' })
    if (s.body[0].type === 'ExpressionStatement') {
      return parseProperty(s.body[0].expression)
    }
    else {
      // TODO: error handling
      return []
    }
  })

  return defineAnimation({
    act: (
      widget: T,
      elapsed: number,
      process: number,
      duration: number,
      ck: CanvasKit,
      params: Record<string, any>,
    ) => {
      // Determine the easing function, prefer the one from params if available.
      const easingFunction = params.by ? params.by : by

      // Apply the easing function to the process if provided
      const adjustedProcess = easingFunction ? easingFunction(process) : process

      if (!called) {
        from = defaultFrom !== undefined ? defaultFrom : params?.from
        to = defaultTo !== undefined ? defaultTo : params?.to
        if (from === undefined) {
          from = normalizeMaybeArray(
            (Array.isArray(propertyName)
              ? propertyName.map(prop => widget[prop])
              : widget[propertyName]) as MaybeArray<number>,
          )
        }
        if (to === undefined) {
          to = normalizeMaybeArray(
            (Array.isArray(propertyName)
              ? propertyName.map(prop => widget[prop])
              : widget[propertyName]) as MaybeArray<number>,
          )
        }

        called = true
      }

      // console.log(adjustedProcess, process)

      // Apply the animation to each property.
      const applyChange = (
        prop: string[],
        start: number,
        end: number,
      ) => {
        const valueChange = (end - start) * adjustedProcess
        setByChain(prop, widget, start + valueChange)
      }

      propChains.forEach((prop, index) => {
        const start = from[index] ?? from ?? getByChain(deepClone(prop), widget) // Use widget's value as a fallback
        const end = to[index] ?? to ?? getByChain(deepClone(prop), widget) // Use widget's value as a fallback
        applyChange(deepClone(prop), start, end)
      })
    },
  })
}
