export async function useAnimationJson(src: string) {
  const response = await fetch(src)
  const text = await response.text()
  return text
}
