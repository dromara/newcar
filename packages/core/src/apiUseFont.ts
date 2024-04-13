import { $source } from "./global"

export const useFont = async (src: string) => {
  const response = await fetch(src)
  const array = await response.arrayBuffer()
  $source.fonts.push(array)
  return array
}