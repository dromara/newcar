import type { Widget, WidgetStyle } from './widget'
import type { Animation } from './animation'
import { defineAnimation } from './animation'
import type { MaybeArray, PickNumberKeys } from './types'

/**
 * Easing function type, which takes a progress ratio and returns an adjusted ratio.
 */
type EasingFunction = (progress: number) => number

/**
 * Creates an animation that changes one or more properties of a widget's style over time.
 * The `from` and `to` values are either provided directly or through `params` when calling `Widget.animate`.
 * Additionally, an easing function can be provided either directly or through `params` to adjust the animation progress.
 * @param propertyName The name of the style property or array of style properties to change.
 * @param defaultFrom Optional default starting value or array of starting values for the style property/properties.
 * @param defaultTo Optional default ending value or array of ending values for the style property/properties.
 * @param by Optional easing function to adjust the animation progress, can be overridden by params.by.
 * @returns An Animation object.
 */
export function changeStyle<T extends Widget>(
  propertyName: MaybeArray<PickNumberKeys<T['style']>>,
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

      // If `from` and `to` values are not provided either as defaults or through `params`, use the widget's current style values.
      if (from === undefined && to === undefined) {
        if (Array.isArray(propertyName)) {
          from = propertyName.map(prop => widget.style[prop as keyof WidgetStyle])
          to = from
        }
        else {
          from = widget.style[propertyName as keyof WidgetStyle]
          to = from
        }
      }
      // If only one of `from` or `to` value is provided, use the widget's current style value for the missing one.
      else if (from === undefined) {
        if (Array.isArray(propertyName))
          from = propertyName.map(prop => widget.style[prop as keyof WidgetStyle])
        else
          from = widget.style[propertyName as keyof WidgetStyle]
      }
      else if (to === undefined) {
        if (Array.isArray(propertyName))
          to = propertyName.map(prop => widget.style[prop as keyof WidgetStyle])
        else
          to = widget.style[propertyName as keyof WidgetStyle]
      }

      // Normalize `from` and `to` values to arrays if they are not already.
      if (!Array.isArray(from))
        from = [from]

      if (!Array.isArray(to))
        to = [to]

      // Apply the animation to each property.
      const applyChange = (
        prop: PickNumberKeys<T['style']>,
        start: number,
        end: number,
      ) => {
        const valueChange = (end - start) * adjustedProcess
        ;(widget.style[prop as keyof WidgetStyle] as any) = start + valueChange
      }

      if (Array.isArray(propertyName)) {
        // Handle multiple properties.
        propertyName.forEach((prop, index) => {
          const startValue = from[index] !== undefined ? from[index] : from[0] // Use the first value as a fallback
          const endValue = to[index] !== undefined ? to[index] : to[0] // Use the first value as a fallback
          applyChange(prop, startValue, endValue)
        })
      }
      else {
        // Handle a single property.
        applyChange(propertyName, from[0], to[0])
      }
    },
  })
}
