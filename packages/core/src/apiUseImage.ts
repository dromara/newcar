import { $source } from "./global"

export const useImage = async (src: string) => {
  const response = await fetch(src)
  const array = await response.arrayBuffer()
  $source.images.push(array)
  return array
}