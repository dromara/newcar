import type { Widget, WidgetOptions } from '@newcar/core'
import { changeProperty, parallel, useFont, useImage } from '@newcar/core'
import { Color, Shader, isString } from '@newcar/utils'
import { linear } from '@newcar/basic'
import type { WidgetFormat } from './format'
import { processAction } from './process-action'

export function processItem(
  item: string | Array<number> | WidgetFormat,
  widgets: Record<string, typeof Widget>,
  anims: Record<string, () => any>,
  easingFunctions: Record<string, (t: number) => number>,
): any {
  for (const key in widgets) {
    if ((item as WidgetFormat).type === key) {
      return importWidget(item as WidgetFormat, widgets, anims, easingFunctions)
    }
  }
  if (Array.isArray(item) && item.length === 4) {
    return Color.rgba(item[0], item[1], item[2], item[3] ?? 1)
  }
  else if (!isString(item)) {
    return item
  }
  else if (isString(item as string) && /color\(.+\)/.test(item as string)) {
    return Color.parse((item as string).replace(/color\(/, '').replace(/\)$/, ''))
  }
  else if (isString(item as string) && /shader\(.+\)/.test(item as string)) {
    return Shader.createColorShader(Color.WHITE)
  }
  else if (isString(item as string) && /fn\(.+\)/.test(item as string)) {
    // eslint-disable-next-line no-new-func
    return Function(`return ${(item as string).replace(/fn\(/, '').replace(/\)$/, '')}`)()
  }
  else if (isString(item as string) && /image\(.+\)/.test(item as string)) {
    return useImage((item as string).replace(/image\(/, '').replace(/\)$/, ''))
  }
  else if (isString(item as string) && /font\(.+\)/.test(item as string)) {
    return useFont((item as string).replace(/font\(/, '').replace(/\)$/, ''))
  }
  else if (isString(item as string) && /calc\(.+\)/.test(item as string)) {
    // eslint-disable-next-line no-new-func
    return Function(`return ${(item as string).replace(/calc\(/, '').replace(/\)$/, '')}`)()
  }
}

export function processOptions(
  options: WidgetOptions,
  widgets: Record<string, typeof Widget>,
  anims: Record<string, () => any>,
  easingFunctions: Record<string, (t: number) => number>,
) {
  for (const key in options) {
    if (typeof (options as Record<string, any>)[key] === 'object') {
      (options as Record<string, any>)[key] = processOptions((options as Record<string, any>)[key], widgets, anims, easingFunctions)
    }
    (options as Record<string, any>)[key] = processItem((options as Record<string, any>)[key], widgets, anims, easingFunctions)
  }
  return options
}

export function processArguments(
  args: unknown[],
  widgets: Record<string, typeof Widget>,
  anims: Record<string, () => any>,
  easingFunctions: Record<string, (t: number) => number>,
) {
  const result = []
  for (const arg of args) {
    if (isString(arg)) {
      result.push(processItem(arg as string, widgets, anims, easingFunctions))
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
  easingFunctions: Record<string, (t: number) => number>,
) {
  if (typeof widgetData === 'string') {
    widgetData = JSON.parse(widgetData) as WidgetFormat
  }
  const widget = new widgets[widgetData.type](...processArguments(widgetData.arguments ?? [], widgets, anims, easingFunctions), processOptions(widgetData.options, widgets, anims, easingFunctions))
  if (Array.isArray(widgetData.animations)) {
    widgetData.animations.forEach((animation) => {
      if (Array.isArray(animation)) {
        widget.animate(
          parallel(...animation.map((ani) => {
            return ani.custom
              ? (ani.custom === 'change-property'
                  ? changeProperty(() => (widget as Record<string, any>)[ani.target])
                    .withAttr({
                      ...processOptions(ani.parameters, widgets, anims, easingFunctions),
                      by: easingFunctions[ani.parameters.by as string] ?? linear,
                    })
                  : console.warn(`[Newcar Warn] Json import error: there is no custom type named '${ani.custom}'`))
              : anims[ani.type]().withAttr({
                ...processOptions(ani.parameters, widgets, anims, easingFunctions),
                by: easingFunctions[ani.parameters.by as string] ?? linear,
              })
          })),
        )
      }
      else {
        if (typeof animation.custom === 'string') {
          if (animation.custom === 'change-property') {
            widget.animate(changeProperty(() => (widget as Record<string, any>)[animation.target])
              .withAttr({
                ...processOptions(animation.parameters, widgets, anims, easingFunctions),
                by: easingFunctions[animation.parameters.by as string] ?? easingFunctions.linear,
              }) as any)
          }
          else {
            console.warn(`[Newcar Warn] Json import error: there is no custom type named '${animation.custom}'`)
          }
        }
        else {
          widget.animate(anims[animation.type]().withAttr({
            ...processOptions(animation.parameters, widgets, anims, easingFunctions),
            by: easingFunctions[animation.parameters.by as string] ?? easingFunctions.linear,
          }))
        }
      }
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

  if (widgetData.children) {
    widget.add(...widgetData.children.map((child) => {
      return importWidget(child, widgets, anims, easingFunctions)
    }))
  }

  return widget
}
