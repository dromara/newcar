export function createCanvas(w?: number, h?: number): HTMLCanvasElement {
  const el = document.createElement('canvas')
  if (w != null)
    el.width = w
  if (h != null)
    el.height = h
  return el
}

export function isNull(v: unknown): boolean {
  return v === null
}

export function isUndefined(v: unknown): boolean {
  return typeof v === 'undefined'
}

export function isEqual(a: unknown, b: unknown): boolean {
  return Object.is(a, b)
}

export function isString(v: unknown): boolean {
  return typeof v === 'string'
}

export function isAsyncFunction(func: (...parameters: any[]) => any) {
  return func.constructor.name === 'AsyncFunction'
}

export function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item)
}

export function isPrimitiveOrArray(obj: any): boolean {
  return Array.isArray(obj) || (typeof obj !== 'object' && typeof obj !== 'function')
}

export function deepEqual(objA: any, objB: any): boolean {
  if (typeof objA !== 'object')
    return objA === objB
  if (objA === null || objB === null || objA === undefined || objB === undefined)
    return objA === objB

  const keysA = new Set(Object.keys(objA))
  const keysB = new Set(Object.keys(objB))

  for (const key of keysA) {
    // Skip circular reference
    try {
      JSON.stringify(objA[key])
    }
    catch {
      continue
    }

    if (!keysB.has(key))
      return false
    if (typeof objA[key] === 'object')
      return deepEqual(objA[key], objB[key])
    else if (objA[key] !== objB[key])
      return false
  }

  return true
}
