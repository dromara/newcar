import { Widget } from './widget';
import { Animation, defineAnimation } from './animation';

/**
 * Easing function type, which takes a progress ratio and returns an adjusted ratio.
 */
type EasingFunction = (progress: number) => number;

/**
 * Creates an animation that changes one or more style properties of a widget over time.
 * The `from` and `to` values are either provided directly or through `params` when calling `Widget.animate`.
 * Additionally, an easing function can be provided either directly or through `params` to adjust the animation progress.
 * @param styleItemName The name of the style property or array of style properties to change.
 * @param defaultFrom Optional default starting value or array of starting values for the style property/properties.
 * @param defaultTo Optional default ending value or array of ending values for the style property/properties.
 * @param by Optional easing function to adjust the animation progress, can be overridden by params.by.
 * @returns An Animation object.
 */
export function changeStyle(styleItemName: string | string[], defaultFrom?: number | number[], defaultTo?: number | number[], by?: EasingFunction): Animation {
  return defineAnimation({
    act: (widget: Widget, elapsed: number, process: number, params: Record<string, any>) => {
      // Determine the easing function, prefer the one from params if available.
      const easingFunction = params.by ? params.by : by;

      // Apply the easing function to the process if provided
      const adjustedProcess = easingFunction ? easingFunction(process) : process;

      // Determine `from` and `to` values, using defaults if provided, else require them from `params`.
      const from = defaultFrom !== undefined ? defaultFrom : params?.from;
      const to = defaultTo !== undefined ? defaultTo : params?.to;

      // Ensure `from` and `to` values are provided either as defaults or through `params`.
      if (from === undefined || to === undefined) {
        throw new Error('Animation requires `from` and `to` values to be provided either as defaults or through params.');
      }

      // Apply the animation to each style property.
      const applyChange = (prop: string, start: number, end: number) => {
        const valueChange = (end - start) * adjustedProcess;
        (widget.style as Record<string, any>)[prop] = start + valueChange;
      };

      if (Array.isArray(styleItemName)) {
        // Handle multiple style properties.
        styleItemName.forEach((prop, index) => {
          const startValue = Array.isArray(from) ? from[index] : from;
          const endValue = Array.isArray(to) ? to[index] : to;
          applyChange(prop, startValue, endValue);
        });
      } else {
        // Handle a single style property.
        const startValue = typeof from === 'number' ? from : from[0];
        const endValue = typeof to === 'number' ? to : to[0];
        applyChange(styleItemName, startValue, endValue);
      }
    }
  });
}