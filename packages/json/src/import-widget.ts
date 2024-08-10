import type { Widget } from '@newcar/core'
import type { WidgetFormat } from './format'
import { processAction } from './process-action'

export function importWidget<T extends typeof Widget>(
  widgetData: WidgetFormat | string,
  widgets: Record<string, T>,
  anims: Record<string, () => any>,
) {
  if (typeof widgetData === 'string') {
    widgetData = JSON.parse(widgetData) as WidgetFormat
  }
  const widget = new widgets[widgetData.type](...widgetData.arguments, widgetData.options)
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
