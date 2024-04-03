import { Widget } from './widget';
import { Animation, defineAnimation } from './animation'

/**
 * Creates an animation that changes one or more properties of a widget over time.
 * The `from` and `to` values are either provided directly or through `params` when calling `Widget.animate`.
 * @param propertyName The name of the property or array of properties to change.
 * @param defaultFrom Optional default starting value or array of starting values for the property/properties.
 * @param defaultTo Optional default ending value or array of ending values for the property/properties.
 * @returns An Animation object.
 */
export function changeStyle(styleItemName: string | string[], defaultFrom?: number | number[], defaultTo?: number | number[]): Animation {
  return defineAnimation({
    act: (widget: Widget, elapsed: number, process: number, params: Record<string, any>) => {
      // Determine `from` and `to` values, using defaults if provided, else require them from `params`.
      const from = defaultFrom !== undefined ? defaultFrom : params?.from;
      const to = defaultTo !== undefined ? defaultTo : params?.to;

      // Ensure `from` and `to` values are provided either as defaults or through `params`.
      if (from === undefined || to === undefined) {
        throw new Error('Animation requires `from` and `to` values to be provided either as defaults or through params.');
      }

      // Apply the animation to each property.
      const applyChange = (prop: string, start: number, end: number) => {
        const valueChange = (end - start) * process;
        (widget.style as Record<string, any>)[prop] = start + valueChange;
      };

      if (Array.isArray(styleItemName)) {
        // Handle multiple properties.
        styleItemName.forEach((prop, index) => {
          const startValue = Array.isArray(from) ? from[index] : from;
          const endValue = Array.isArray(to) ? to[index] : to;
          applyChange(prop, startValue, endValue);
        });
      } else {
        // Handle a single property.
        const startValue = typeof from === 'number' ? from : from[0];
        const endValue = typeof to === 'number' ? to : to[0];
        applyChange(styleItemName, startValue, endValue);
      }
    }
  });
}