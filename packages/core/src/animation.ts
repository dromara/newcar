import { Widget } from './widget'

export interface Animation<T> {
  act: (
    widget: T,
    elapsed: number,
    process: number,
    params?: any
  ) => void
}

export function defineAnimation<T extends Widget>(animation: Animation<T>): Animation<T> {
  return animation
}

export interface AnimationInstance {
  startAt: number
  during: number
  animation: Animation<Widget>
  params?: Record<string, any>
  mode: 'positive' | 'reverse'
}
