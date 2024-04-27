import { isObject } from './judgements'

export function deepMerge<
  T extends Record<string, any>,
  U extends Record<string, any>,
>(target: T, source: U): T & U {
  const output: Record<string, any> = { ...target }

  Object.keys(source).forEach((key) => {
    if (isObject(source[key])) {
      if (isObject(target[key])) {
        output[key] = deepMerge(target[key], source[key])
      } else {
        // Directly assign if the corresponding key in target is not an object
        output[key] = source[key]
      }
    } else {
      output[key] = source[key]
    }
  })

  return output as T & U
}
