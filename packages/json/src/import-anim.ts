import { Color } from '@newcar/utils'

export interface AnimFormat {}

export function parseColor(value: unknown) {
  if (Array.isArray(value)) {
    if (value.length < 4) {
      throw new Error(`[parseColor] Invalid color array found : ${value}`)
    }

    return Color.rgba(value[0], value[1], value[2], value[3])
  }
  else if (typeof value === 'string') {
    const color = Color.parse(value)

    return color
  }
}

// TODO: implement `parseShader`
// export const parseShader = (value: unknown) => {}

export function parseKey(key: string): [string, string] | string {
  const reg = /^(\()([\w$]+)(\))(.+)/
  const res = key.match(reg)
  const type = res[1]
  const name = res[3]

  return (type !== undefined && !name) ? [type, name] : key
}

// TODO: add support for custom property type resolver
export const animParamResolvers: Map<string, (value: unknown) => unknown> = new Map([
  ['color', parseColor],
])

export function parseParams(params: unknown): unknown | Record<string, unknown> {
  if (params === null)
    return null
  if (params === undefined)
    return undefined
  if (typeof params !== 'object')
    return params

  const res: Record<string, unknown> = {}

  const keys = Object.keys(params)
  for (const key of keys) {
    const parsed = parseKey(key)
    if (typeof parsed === 'string') {
      res[key] = parseParams((params as Record<string, unknown>)[key])
    }
    else {
      const [type, name] = parsed
      const resolver = animParamResolvers.get(type)

      if (resolver === undefined) {
        throw new Error(`[importAnim] Parameter ${name} invalid property type ${type}, is it registered?`)
      }

      res[key] = resolver((params as Record<string, unknown>)[name])
    }
  }

  return res
}

export function importAnim(source: AnimFormat | string): AnimFormat {
  if (typeof source === 'string') {
    const res = JSON.parse(source)

    if (!res.type) {
      throw new Error(`[importAnim] Invalid \`AnimFormat\``)
    }
    const type = res.type

    if (!res.parameters) {
      return {
        type,
        parameters: {},
      }
    }
    else {
      const params = parseParams(res.parameters)

      if (typeof params !== 'object') {
        throw new TypeError(`[importAnim] Invalid \`AnimFormat\``)
      }

      return {
        type,
        params,
      }
    }
  }
  else {
    return source
  }
}
