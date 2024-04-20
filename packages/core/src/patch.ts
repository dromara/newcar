import type { Canvas, CanvasKit } from 'canvaskit-wasm'
import { isEqual } from '@newcar/utils'
import type { AsyncWidget, AsyncWidgetResponse } from './asyncWidget'
import type { Widget } from './widget'

export function shallowEqual(objA: any, objB: any): string[] {
  const changedProperties: string[] = []

  if (isEqual(objA, objB))
    return changedProperties

  if (objA === objB)
    return changedProperties

  if (
    typeof objA !== 'object'
    || objA === null
    || typeof objB !== 'object'
    || objB === null
  )
    return changedProperties

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)
  const lengthA = keysA.length

  const keysBSet = new Set(keysB)

  // Function to check if the value is of a primitive type or an array
  const isPrimitiveOrArray = (value: any) => {
    return value !== Object(value) || Array.isArray(value)
  }

  for (let i = 0; i < lengthA; i++) {
    const key = keysA[i]
    if (key === 'style') {
      // Recursively compare the 'style' object
      const styleDifferences = shallowEqual(objA.style, objB.style)
      if (styleDifferences.length > 0)
        changedProperties.push(key)
    }
    else if (!keysBSet.has(key) || (isPrimitiveOrArray(objA[key]) && objA[key] !== objB[key])) {
      changedProperties.push(key)
    }
  }

  // Optionally, you might want to check for keys present in objB but not in objA
  // This is optional and depends on your use case
  keysB.forEach((key) => {
    if (!keysA.includes(key) && isPrimitiveOrArray(objB[key]))
      changedProperties.push(key)
  })

  return changedProperties
}

export async function patch(
  old: Widget | AsyncWidget,
  now: Widget | AsyncWidget,
  ck: CanvasKit,
  canvas: Canvas,
) {
  canvas.save()
  const differences = shallowEqual(old, now)
  for (const param of differences) {
    !now._isAsyncWidget()
      ? (() => {
          try {
            now.preupdate(ck, param)
          }
          catch {}
        })()
      : await (async () => {
        try {
          const res = await now.preupdate(ck, param)
          if ((res as AsyncWidgetResponse).status === 'error') {
            console.warn(
              '[Newcar Warn] Failed to laod async widget, please check if your network.',
            )
          }
        }
        catch {}
      })()
    if (param === 'style') {
      const contrasts = shallowEqual(old.style, now.style)
      for (const contrast of contrasts) {
        try {
          await now.preupdate(ck, `style.${contrast}`)
        }
        catch {}
      }
    }
  }

  try {
    now.update(canvas)
  }
  catch {}

  const oldKeyToIdx = new Map<string, number>()
  const newKeyToIdx = new Map<string, number>()

  // Handle children
  old.children.forEach((child, index) => {
    oldKeyToIdx.set(child.key, index)
  })
  now.children.forEach((child, index) => {
    newKeyToIdx.set(child.key, index)
  })

  // Update and add new widgets
  let oldIndex
  for (const newChild of now.children) {
    oldIndex = oldKeyToIdx.get(newChild.key)
    if (oldIndex !== undefined) {
      const oldChild = old.children[oldIndex]
      await patch(oldChild, newChild, ck, canvas)
    }
    else {
      // Add new child since it doesn't exist in the old children
      now.add(newChild) // Implement this function based on how you add children to canvas
    }
  }

  canvas.restore()

  // Remove old widgets that are not present in new widgets
  old.children.forEach((oldChild, _oldIndex) => {
    if (!newKeyToIdx.has(oldChild.key))
      now.children.find(value => oldChild === value) // Implement this function based on how you remove children from canvas
  })
}
