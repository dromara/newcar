import * as ac from 'acorn'
import type { Widget } from './widget'
import type { Animation } from './animation'
import { defineAnimation } from './animation'
import type { MaybeArray, PickNumberKeys } from './types'

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
            if (typeof e.property.value === 'number')
              chain.push(e.property.value.toString())
            else
              return []

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
  const prop = chain.shift()
  if (chain.length === 0) {
    Object.defineProperty(object, prop, {
      value,
      writable: true,
    })
  }
  else {
    if (object[prop] === undefined) {
      Object.defineProperty(object, prop, {
        value: {},
        writable: true,
      })
    }
    setByChain(chain, object[prop], value)
  }
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
  return defineAnimation({
    act: (
      widget: T,
      elapsed: number,
      process: number,
      params: Record<string, any>,
    ) => {
      // Determine the easing function, prefer the one from params if available.
      const easingFunction = params.by ? params.by : by

      // Apply the easing function to the process if provided
      const adjustedProcess = easingFunction ? easingFunction(process) : process

      // Determine `from` and `to` values, using defaults if provided, else require them from `params`.
      let from = defaultFrom !== undefined ? defaultFrom : params?.from
      let to = defaultTo !== undefined ? defaultTo : params?.to

      // If `from` and `to` values are not provided either as defaults or through `params`, use the widget's current values.
      if (from === undefined && to === undefined) {
        from = Array.isArray(propertyName)
          ? propertyName.map(prop => widget[prop])
          : widget[propertyName]
        to = from
      }
      // If only one of `from` or `to` value is provided, use the widget's current value for the missing one.
      if (from === undefined) {
        from = Array.isArray(propertyName)
          ? propertyName.map(prop => widget[prop])
          : widget[propertyName]
      }
      if (to === undefined) {
        to = Array.isArray(propertyName)
          ? propertyName.map(prop => widget[prop])
          : widget[propertyName]
      }

      // Normalize `from` and `to` values to arrays if they are not already.
      if (!Array.isArray(from))
        from = [from]

      if (!Array.isArray(to))
        to = [to]

      if (!Array.isArray(propertyName))
        propertyName = [propertyName]

      // Apply the animation to each property.
      const applyChange = (
        prop: string[],
        start: number,
        end: number,
      ) => {
        const valueChange = (end - start) * adjustedProcess
        setByChain(prop, widget, start + valueChange)
      }

      const propChains = propertyName.map((p) => {
        const s = ac.parse(p as string, { ecmaVersion: 'latest' })
        if (s.body[0].type === 'ExpressionStatement') {
          return parseProperty(s.body[0].expression)
        }
        else {
          // TODO: error handling
          return []
        }
      })

      propChains.forEach((prop, index) => {
        const start = from[index] !== undefined ? from[index] : getByChain(prop, widget) // Use widget's value as a fallback
        const end = to[index] !== undefined ? to[index] : getByChain(prop, widget) // Use widget's value as a fallback
        applyChange(prop, start, end)
      })
    },
  })
}
