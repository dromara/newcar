export function deepClone(obj: any) {
  const newObj = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        (newObj as Record<string, unknown>)[key] = (obj && typeof obj[key] === 'object') ? deepClone(obj[key]) : obj[key]
      }
    }
  }
  return newObj
}
