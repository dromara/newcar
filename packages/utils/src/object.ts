import { deepEqual, isObject, isPrimitiveOrArray } from './judgements'

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

export function compareObj(objA: any, objB: any, ignored: string[][] = []): string[][] {
  let changed: string[][] = []

  if (typeof objA !== 'object' || typeof objB !== 'object')
    return changed

  changed = foldObj((changedProps, chain, value) => {
    if (!deepEqual(getByChain(deepClone(chain), objB), value))
      return changedProps.concat([chain])
    else return changedProps
  }, [], objA, ignored)

  return changed
}

// Don't be confused with the name! Just added '_' before because it's PARTIALLY recursive, from the functional programming's view
export function _objKeyChains(
  prefix: string[],
  obj: any,
  depth: number,
  maxDepth = 100,
  ignored: string[][] = [],
): Map<string[], any> {
  let result = new Map()

  if (ignored.some(i => !deepEqual(prefix, i)))
    return result
  if (depth >= maxDepth)
    return result
  if (typeof obj !== 'object')
    return result

  const keys = Object.keys(obj)
  for (const key of keys) {
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
  ignored: string[][] = [],
): T {
  if (typeof obj !== 'object')
    return
  const keyEntries = _objKeyChains([], obj, 0, 100, ignored)
  let result = defaultValue

  for (const [chain, value] of keyEntries) {
    result = folder(result, chain, value)
  }

  return result
}

export function shallowCompare(prefix: string[], objA: any, objB: any): string[][] {
  const result: string[][] = []

  const keysA = new Set(Object.keys(objA))
  const keysB = new Set(Object.keys(objB))

  for (const key of keysA) {
    if (!keysB.has(key)) {
      result.push([key])
    }
    else if (!deepEqual(objA[key], objB[key])) {
      result.push([key])
    }
  }

  return result.map(c => prefix.concat(c))
}

export function shallowEqual(objA: any, objB: any, ignored: string[] = ['children']): string[][] {
  let result: string[][] = []

  const keysA = new Set(Object.keys(objA).filter(k => !ignored.includes(k)))
  const keysB = new Set(Object.keys(objB).filter(k => !ignored.includes(k)))

  for (const key of keysA) {
    if (!keysB.has(key)) {
      result.push([key])
    }
    else if (isPrimitiveOrArray(objA[key]) && !deepEqual(objA[key], objB[key])) {
      result.push([key])
    }
  }
  result = result.concat(shallowCompare(['style'], objA.style, objB.style))

  return result
}
