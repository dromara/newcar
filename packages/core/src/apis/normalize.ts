import { getReactiveTag } from './get-reactive-tag'

export function normalize(obj: any) {
  if (typeof obj !== 'object')
    return obj

  const normalized: any = {}
  const keys = Object.keys(obj)

  for (const key of keys) {
    if (typeof obj[key] !== 'object') {
      normalized[key] = obj[key]
    }
    else if (getReactiveTag(obj[key]) === 2) {
      normalized[key] = obj[key].value
    }
    else {
      normalized[key] = obj[key]
    }
  }

  return normalized
}
