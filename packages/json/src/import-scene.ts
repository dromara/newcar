import type { Widget } from '@newcar/core'
import { createScene } from '@newcar/core'
import type { SceneFormat } from './format.ts'
import { importWidget } from './import-widget.ts'

export function importScene<T extends typeof Widget>(
  sceneData: SceneFormat | string,
  widgets: Record<string, T>,
  anims: Record<string, () => any>,
) {
  if (typeof sceneData === 'string')
    sceneData = JSON.parse(sceneData) as SceneFormat
  return createScene(
    importWidget(sceneData.root, widgets, anims),
  )
}
