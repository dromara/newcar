import { Canvas, CanvasKit } from 'canvaskit-wasm'
import { Widget } from '../widget'
import { deepClone } from './deepClone'

export function shallowEqual(objA: any, objB: any): string[] {
  const changedProperties: string[] = []

  if (objA === objB) {
    return changedProperties
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return changedProperties
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  // Use a Set to efficiently check for the presence of keys
  const keysBSet = new Set(keysB)

  keysA.forEach((key) => {
    if (!keysBSet.has(key) || objA[key] !== objB[key]) {
      changedProperties.push(key)
    }
  })

  // console.log(changedProperties)

  return changedProperties
}

export function patch(old: Widget, now: Widget, ck: CanvasKit, canvas: Canvas) {
  shallowEqual(old, now).forEach((param) => {
    now.predraw(ck, param)
  })
  now.children.forEach((child, index) => {
    patch(old.children[index], child, ck, canvas)
  })
  now.draw(canvas)
}
