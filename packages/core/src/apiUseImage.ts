import { $source } from './global'

export async function useImage(src: string) {
  const response = await fetch(src)
  const array = await response.arrayBuffer()
  $source.images.push(array)
  return array
}
