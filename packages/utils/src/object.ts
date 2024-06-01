import { deepEqual, isObject, isPrimitiveOrArray } from './index'

export function deepClone(obj: object, map = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null)
    return obj

  if (map.has(obj))
    return map.get(obj)

  let cloned: any[] | Record<string, any>
  if (Array.isArray(obj)) {
    cloned = []
    map.set(obj, cloned)
    for (let i = 0; i < obj.length; i++) cloned.push(deepClone(obj[i], map))
  }
  else {
    cloned = {}
    map.set(obj, cloned)
    for (const key in obj)
      cloned[key] = deepClone((obj as Record<string, any>)[key], map)
  }

  return cloned
}

export function getByChain(chain: string[], object: any): any {
  const prop = chain.shift()
  const des = Object.getOwnPropertyDescriptor(object, prop)
  if (des === undefined)
    return undefined
  if (chain.length === 0)
    return des.value
  else
    return getByChain(chain, des.value)
}

export function compareObj(objA: any, objB: any): string[][] {
  let changed: string[][] = []

  if (typeof objA !== 'object' || typeof objB !== 'object')
    return changed

  changed = foldObj((changedProps, chain, value) => {
    if (!deepEqual(getByChain(deepClone(chain), objB), value))
      return changedProps.concat([chain])
    else return changedProps
  }, [], objA)

  return changed
}

// Don't be confused with the name! Just added '_' before because it's PARTIALLY recursive, from the functional programming's view
export function _objKeyChains(
  prefix: string[],
  obj: any,
  depth: number,
  maxDepth = 100,
): Map<string[], any> {
  let result = new Map()

  if (depth >= maxDepth)
    return result
  if (typeof obj !== 'object')
    return result

  const keys = Object.keys(obj)
  for (const key of keys) {
    try {
      JSON.stringify(obj[key])
    }
    catch {
      continue
    }
    if (isObject(obj[key])) {
      const _prefix = deepClone(prefix) as string[]
      _prefix.push(key)

      result = new Map([..._objKeyChains(_prefix, obj[key], depth + 1, maxDepth), ...result])
    }
    else if (isPrimitiveOrArray(obj[key])) {
      result.set(prefix.concat([key]), obj[key])
    }
  }

  return result
}

// Uses `foldObj` should be order-independent, because that was not considered in `_objKeyChains`
export function foldObj<T>(
  folder: (acc: T, chain: string[], value: any) => T,
  defaultValue: T,
  obj: any,
): T {
  if (typeof obj !== 'object')
    return
  const keyEntries = _objKeyChains([], obj, 0)
  let result = defaultValue

  for (const [chain, value] of keyEntries) {
    result = folder(result, chain, value)
  }

  return result
}
