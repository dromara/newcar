export const $sourcesLoaded: Record<string, ArrayBuffer> = {}

export const preload = async (
  ...sources: {
    name: string,
    src: string
    type: 'image' | 'font'
  }[]
): Promise<void> => {
  for (const source in sources) {
    switch (sources[source].type) {
      case 'image': {
        const response = await fetch(sources[source].src)
        $sourcesLoaded[sources[source].name] = await response.arrayBuffer()
        break
      }
      case 'font': {
        const response = await fetch(sources[source].src)
        $sourcesLoaded[sources[source].name] = await response.arrayBuffer()
        break
      }
    }
  }
}
