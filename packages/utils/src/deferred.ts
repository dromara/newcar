export interface Deferred<T> {
  resolve: (value: T) => Promise<T>
  reject: (err: any) => Promise<T>
  readonly promise: Promise<T>
}

export function deferred<T>(): Deferred<T> {
  let resolve, reject
  const promise = new Promise<T>((...fns) => [resolve, reject] = fns)

  return {
    resolve,
    reject,
    promise,
  }
}
