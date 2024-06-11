export type MaybeArray<T> = T | Array<T>

export function normalize<T>(marr: MaybeArray<T>): Array<T> {
  return Array.isArray(marr) ? marr : [marr]
}

export type Subset<T> = {
  [K in keyof T]?: T[K]
}
export type Merge<A, B> = B & {
  [K in keyof A]: K extends keyof B ? B[K] : A[K]
}
