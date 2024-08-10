import type { Widget, WidgetOptions } from '@newcar/core'
import { Color, Shader, isString } from '@newcar/utils'
import type { WidgetFormat } from './format'
import { processAction } from './process-action'
import { processResource } from './process-resource'

export function processColor(color: string | Array<number>) {
  if (Array.isArray(color)) {
    return Color.rgba(color[0], color[1], color[2], color[3] ?? 1)
  }
  else if (isString(color) && /color\(.+\)/) {
    return Color.parse(color.replace(/color\(/, '').replace(/\)$/, ''))
  }
  else if (isString(color) && /shader\(.+\)/) {
    return Shader.createColorShader(Color.WHITE)
  }
  else {
    return color
  }
}

export function processOptions(options: WidgetOptions) {
  for (const key in options) {
    if (typeof (options as Record<string, any>)[key] === 'object')
      (options as Record<string, any>)[key] = processOptions((options as Record<string, any>)[key])
    const result1 = processResource((options as Record<string, any>)[key])
    const result2 = processColor((options as Record<string, any>)[key])
    if (isString(result2)) {
      if (isString(result1)) {
        (options as Record<string, any>)[key] = (options as Record<string, any>)[key]
      }
      else {
        (options as Record<string, any>)[key] = result1
      }
    }
    else {
      (options as Record<string, any>)[key] = result2
    }
  }
  return options
}

export function processArguments(args: unknown[]) {
  const result = []
  for (const arg of args) {
    if (isString(arg)) {
      const result1 = processResource(arg as string)
      const result2 = processColor(arg as string)
      if (isString(result1)) {
        if (isString(result2)) {
          result.push(arg)
        }
        else {
          result.push(result2)
        }
      }
      else {
        result.push(result1)
      }
    }
    else {
      result.push(arg)
    }
  }

  return result
}

export function importWidget<T extends typeof Widget>(
  widgetData: WidgetFormat | string,
  widgets: Record<string, T>,
  anims: Record<string, () => any>,
) {
  if (typeof widgetData === 'string') {
    widgetData = JSON.parse(widgetData) as WidgetFormat
  }
  const widget = new widgets[widgetData.type](...processArguments(widgetData.arguments), processOptions(widgetData.options))
  if (widgetData.children) {
    widget.add(...widgetData.children.map((child) => {
      return importWidget(child, widgets, anims)
    }))
  }
  if (widgetData.animations) {
    widgetData.animations.forEach((animation) => {
      widget.animate(anims[animation.type]().withAttr(animation.parameters))
    })
  }
  if (widgetData.actions) {
    const tolerance = 0.1
    widgetData.actions.forEach((action) => {
      widget.setUpdate((e, w) => {
        if (Math.abs(e - action.elapsed) <= tolerance) {
          processAction(w, action)
        }
      })
    })
  }

  return widget
}
