import { Canvas, CanvasKit } from 'canvaskit-wasm'
import { Widget } from '../widget'
import { deepClone } from './deep-clone'

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
  console.log(canvas);
  canvas.save()
  console.log(shallowEqual(old, now))
  shallowEqual(old, now).forEach((param) => {
    now.preupdate(ck, param)
  })  
  old.children.forEach((child, index) => {
    console.log(index)
    console.log(child, index)
    canvas.save()
    patch(child, now.children[index], ck, canvas)
    canvas.restore()
  })
  // TODO: If the param is a object
  now.update(canvas)
  canvas.restore()
}
