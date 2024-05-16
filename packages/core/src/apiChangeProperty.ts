import type { Widget, WidgetStyle } from './widget'
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
      else if (from === undefined) {
        from = Array.isArray(propertyName)
          ? propertyName.map(prop => widget[prop])
          : widget[propertyName]
      }
      else if (to === undefined) {
        to = Array.isArray(propertyName)
          ? propertyName.map(prop => widget[prop])
          : widget[propertyName]
      }

      // Normalize `from` and `to` values to arrays if they are not already.
      if (!Array.isArray(from))
        from = [from]

      if (!Array.isArray(to))
        to = [to]

      // Apply the animation to each property.
      const applyChange = (
        prop: PickNumberKeys<T>,
        start: number | undefined,
        end: number,
      ) => {
        if (start === undefined)
          (start as unknown) = widget[prop] // Use the widget's original value as the start value

        if (/style\..+/.test(prop as string)) {
          const propAfterPoint = (prop as string).replace(/style\./, '')
          const valueChange = (end - start) * adjustedProcess
          ; (widget.style[propAfterPoint as keyof WidgetStyle] as any) = start + valueChange
        }
        else {
          const valueChange = (end - start) * adjustedProcess
          ; (widget[prop] as any) = start + valueChange
        }
      }

      if (Array.isArray(propertyName)) {
        // Handle multiple properties.
        propertyName.forEach((prop, index) => {
          const startValue
            = from[index] !== undefined ? from[index] : widget[prop] // Use widget's value as a fallback
          const endValue = to[index] !== undefined ? to[index] : widget[prop] // Use widget's value as a fallback
          applyChange(prop, startValue, endValue)
        })
      }
      else {
        // Handle a single property.
        const startValue
          = from[0] !== undefined ? from[0] : widget[propertyName] // Use widget's value as a fallback
        const endValue = to[0] !== undefined ? to[0] : widget[propertyName] // Use widget's value as a fallback
        applyChange(propertyName, startValue, endValue)
      }
    },
  })
}
