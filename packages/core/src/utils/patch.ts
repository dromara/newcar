import { Canvas, CanvasKit } from 'canvaskit-wasm'
import { Widget } from '../widget'
import { isEqual } from '@newcar/utils'
import { AsyncWidget, AsyncWidgetResponse } from '../asyncWidget'

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
  const lengthA = keysA.length
  const lengthB = keysB.length

  const keysBSet = new Set(keysB)

  for (let i = 0; i < lengthA; i++) {
    const key = keysA[i]
    if (!keysBSet.has(key) || objA[key] !== objB[key]) {
      changedProperties.push(key)
    }
  }

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
          } catch {}
        })()
      : await (async () => {
          try {
            const res = await now.preupdate(ck, param)
            if ((res as AsyncWidgetResponse).status === 'error') {
              console.warn(
                '[Newcar Warn] Failed to laod async widget, please check if your network.',
              )
            }
          } catch {}
        })()
    if (param === 'style') {
      const contrasts = shallowEqual(old.style, now.style)
      for (const contrast of contrasts) {
        try {
          await now.preupdate(ck, `style.${contrast}`)
        } catch {}
      }
    }
  }

  try {
    now.update(canvas)
  } catch {}

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
  let oldIndex, newIndex
  for (const newChild of now.children) {
    oldIndex = oldKeyToIdx.get(newChild.key)
    if (oldIndex !== undefined) {
      const oldChild = old.children[oldIndex]
      await patch(oldChild, newChild, ck, canvas)
    } else {
      // Add new child since it doesn't exist in the old children
      now.add(newChild) // Implement this function based on how you add children to canvas
    }
  }
  
  canvas.restore()

  // Remove old widgets that are not present in new widgets
  old.children.forEach((oldChild, oldIndex) => {
    if (!newKeyToIdx.has(oldChild.key)) {
      now.children.find((value) => oldChild === value) // Implement this function based on how you remove children from canvas
    }
  })
}
