import { Canvas, CanvasKit } from 'canvaskit-wasm'
import { Widget } from '../widget'
import { isEqual } from '@newcar/utils'
import { deepClone } from './deep-clone'

export function shallowEqual(objA: any, objB: any): string[] {
  const changedProperties: string[] = []

  if (isEqual(objA, objB)) return changedProperties

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
  canvas.save()
  const differences = shallowEqual(old, now)
  differences.forEach((param) => {
    now.preupdate(ck, param)
    if (param === 'style') {
      const contrasts = shallowEqual(old.style, now.style)
      contrasts.forEach(contrast => now.preupdate(ck, `style.${contrast}`))
    }
  })
  now.update(canvas)
  now.children.forEach((child, index) => {
    patch(old.children[index], child, ck, canvas)
  })
  // TODO: If the param is a object
  canvas.restore()
}
