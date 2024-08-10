import { useFont, useImage } from '@newcar/core'

export function processResource(str: string) {
  const rex = /(?:image|font)\(.+\)/
  if (rex.test(str)) {
    if (/image\(.+\)/) {
      return useImage(str.replace(/image\(/, '').replace(/\)$/, ''))
    }
    else if (/font\(.+\)/.test(str)) {
      return useFont(str.replace(/font\(/, '').replace(/\)$/, ''))
    }
  }
  else {
    return str
  }
}
