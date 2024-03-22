export const createCanvas = (w?: number, h?: number): HTMLCanvasElement => {
  const el = document.createElement('canvas')
  if (w != null) el.width = w
  if (h != null) el.height = h
  return el
}

export const isNull = (v: unknown): v is void => {
  return v == void 0
}

export const isEqual = (a: unknown, b: unknown): boolean => {
  return Object.is(a, b)
}
