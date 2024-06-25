import { $source } from '../global'

/**
 * Preloading a image.
 * @param src The path of this image.
 * @returns The image that be with ArrayBuffer type.
 */
export async function useImage(src: string) {
  if (typeof window !== 'undefined') {
    const response = await fetch(src)
    const array = await response.arrayBuffer()
    $source.images.push(array)
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
    $source.images.push(array)
    return array
  }
}
