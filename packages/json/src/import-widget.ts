import type { Widget } from '@newcar/core'
import type { WidgetFormat } from './format.ts'

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

  return widget
}
