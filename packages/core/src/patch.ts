import type { Canvas, CanvasKit } from 'canvaskit-wasm'
import { shallowEqual } from '@newcar/utils'
import type { AsyncWidget, AsyncWidgetResponse } from './asyncWidget'
import type { Widget } from './widget'
import { initial } from './initial.ts'

function diff(objA: any, objB: any): string[][] {
  return shallowEqual(objA, objB, [
    'children',
    'updates',
    'setups',
    'plugins',
  ])
}

// The patch function corresponds to the updating of canvas with respect to both old widget tree and updated widget tree.
// The algorithm lies here just like `diff` algorithm in other frontend frameworks, to optimise the updating performance.
// To be exact, it is designed to find the differences between two trees, and update according to these differences, to
// avoid unnecessary changes to the canvas.
export async function patch(
  old: Widget | AsyncWidget,
  now: Widget | AsyncWidget,
  ck: CanvasKit,
  canvas: Canvas,
) {
  if (now.status !== 'live')
    return
  canvas.save()
  const differences = diff(now, old).map((chain) => {
    if (chain[0] === 'style') {
      return [chain[0], chain[1]]
    }
    else {
      return chain
    }
  }).map(c => c.join('.'))
  for (const param of differences) {
    if (!now._isAsyncWidget()) {
      try {
        now.preupdate(ck, param)
      }
      catch {}
    }
    else {
      try {
        const res = await now.preupdate(ck, param)
        if ((res as AsyncWidgetResponse).status === 'error') {
          console.warn(
            '[Newcar Warn] Failed to laod async widget, please check if your network.',
          )
        }
      }
      catch {}
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
  for (const newChild of now.children) {
    const oldIndex = oldKeyToIdx.get(newChild.key)
    if (oldIndex !== undefined) {
      const oldChild = old.children[oldIndex]
      await patch(oldChild, newChild, ck, canvas)
    }
    else {
      // Add new child since it doesn't exist in the old children
      // now.add(newChild) // Implement this function based on how you add children to canvas
      if (newChild.status === 'unborn')
        await initial(newChild, ck, canvas)
    }
  }

  canvas.restore()

  // Remove old widgets that are not present in new widgets
  old.children.forEach((oldChild, _oldIndex) => {
    if (!newKeyToIdx.has(oldChild.key))
      now.children.find(value => oldChild === value) // Implement this function based on how you remove children from canvas
  })
}
