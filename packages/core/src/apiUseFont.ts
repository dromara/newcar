import { $resources } from './resources'

/**
 * Preloading a font file.
 * @param src The font file's path.
 * @returns The Font with `ArrayBuffer` type.
 */
export async function useFont(src: string) {
  if (typeof window !== 'undefined') {
    const response = await fetch(src)
    const array = await response.arrayBuffer()
    $resources.fonts.push(array)
    return array
  }
  else {
    const fs = await import('node:fs')
    const path = await import('node:path')
    const buffer = fs.readFileSync(path.resolve(src))
    const array = buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength,
    )
    $resources.fonts.push(array)
    return array
  }
}
