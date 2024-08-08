import type { WidgetOptions } from '@newcar/core'

export interface WidgetFormat {
  type: string
  arguments: unknown[]
  options: WidgetOptions
  children: WidgetFormat[]
  animations: AnimFormat[]
}

export interface SceneFormat {
  root: WidgetFormat
}

export interface AnimFormat {
  type: string
  parameters: Record<string, unknown>
}
