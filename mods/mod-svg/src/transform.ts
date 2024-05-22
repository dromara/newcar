import type { SVGItem } from './interfaces'

export function transform(_svg: string): SVGItem {
  return {
    tag: 'circle',
    props: {},
    children: [],
  }
}
