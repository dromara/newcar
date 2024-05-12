export function once(f: () => void): () => void {
  let flag = false
  return () => {
    if (flag)
      return
    flag = true
    f()
  }
}
