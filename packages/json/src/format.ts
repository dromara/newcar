import type { WidgetOptions } from '@newcar/core'

export interface WidgetFormat {
  type: string
  arguments: unknown[]
  options: WidgetOptions
  children: WidgetFormat[]
  animations: AnimFormat[] | AnimFormat[][]
  actions: ActionFormat[]
}

export interface SceneFormat {
  root: WidgetFormat
}

export interface AnimFormat {
  type: string
  parameters: Record<string, unknown>
  custom?: 'change-property'
  target?: string
}

export interface ActionFormat {
  type: 'change' | 'call'
  to?: any
  arguments?: unknown[]
  elapsed: number
  handle: string
}
