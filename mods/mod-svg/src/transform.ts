import type { SVGItem } from './elements'

export function transform(_svg: string): SVGItem {
  return {
    tag: 'Circle',
    type: 'Graphics',
    props: {},
    children: [],
  }
}
