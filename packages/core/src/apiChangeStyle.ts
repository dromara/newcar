import type { Widget, WidgetStyle } from './widget'
import type { Animation } from './animation'
import type { MaybeArray, PickNumberKeys } from './types'
import { changeProperty } from './apiChangeProperty'

/**
 * Easing function type, which takes a progress ratio and returns an adjusted ratio.
 */
type EasingFunction = (progress: number) => number

/**
 * Creates an animation that changes one or more style properties of a widget over time.
 * The `from` and `to` values are either provided directly or through `params` when calling `Widget.animate`.
 * Additionally, an easing function can be provided either directly or through `params` to adjust the animation progress.
 * @param propertyName The name of the style property or array of style properties to change.
 * @param defaultFrom Optional default starting value or array of starting values for the style property/properties.
 * @param defaultTo Optional default ending value or array of ending values for the style property/properties.
 * @param by Optional easing function to adjust the animation progress, can be overridden by params.by.
 * @returns An Animation object.
 */
export function changeStyle<T extends Widget>(
  propertyName: MaybeArray<PickNumberKeys<WidgetStyle>>,
  defaultFrom?: MaybeArray<number>,
  defaultTo?: MaybeArray<number>,
  by?: EasingFunction,
): Animation<T> {
  if (!Array.isArray(propertyName))
    propertyName = [propertyName]

  return changeProperty(
    propertyName.map(prop => `style.${prop}` as PickNumberKeys<T>),
    defaultFrom,
    defaultTo,
    by,
  )
}
