import type { Widget } from './widget'
import type { Animation } from './animation'
import { defineAnimation } from './animation'
import type { MaybeArray, PickNumberKeys } from './types'

/**
 * Easing function type, which takes a progress ratio and returns an adjusted ratio.
 */
type EasingFunction = (progress: number) => number

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
      const easingFunction = params.by ? params.by : by
      const adjustedProcess = easingFunction ? easingFunction(process) : process

      let from = params.from !== undefined ? params.from : (defaultFrom !== undefined ? defaultFrom : Array.isArray(propertyName) ? propertyName.map(prop => widget[prop]) : widget[propertyName]);
      let to = params.to !== undefined ? params.to : (defaultTo !== undefined ? defaultTo : Array.isArray(propertyName) ? propertyName.map(prop => widget[prop]) : widget[propertyName]);

      if (!Array.isArray(from))
        from = [from]

      if (!Array.isArray(to))
        to = [to]

      const applyChange = (
        prop: PickNumberKeys<T>,
        start: number,
        end: number,
      ) => {
        const valueChange = (end - start) * adjustedProcess
        ;(widget[prop] as any) = start + valueChange
      }

      if (Array.isArray(propertyName)) {
        propertyName.forEach((prop, index) => {
          const startValue = from[index] !== undefined ? from[index] : widget[prop]
          const endValue = to[index] !== undefined ? to[index] : widget[prop]
          applyChange(prop, startValue, endValue)
        })
      } else {
        const startValue = from[0] !== undefined ? from[0] : widget[propertyName]
        const endValue = to[0] !== undefined ? to[0] : widget[propertyName]
        applyChange(propertyName, startValue, endValue)
      }
    },
  })
}