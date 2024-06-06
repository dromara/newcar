// import type { WidgetOptions, WidgetStyle } from '@newcar/core'
// import { Widget } from '@newcar/core'
// import type { CanvasKit } from 'canvaskit-wasm'
// import tex2svg from 'tex-to-svg'
// import { svg2path } from '../utils/svg2path'

// export interface TexOptions extends WidgetOptions {
//   style?: TexStyle
//   width?: number
// }

// export interface TexStyle extends WidgetStyle { }

// export class Tex extends Widget {
//   svg: string
//   path: string
//   width: number

//   constructor(public tex: string, options: TexOptions) {
//     options ??= {}
//     super(options)
//     this.width = options.width ?? 100
//   }

//   init(_ck: CanvasKit): void {
//     this.svg = tex2svg(this.tex, {
//       width: this.width,
//     })
//     this.path = svg2path(this.svg)
//     // console.log(this.path)
//   }
// }
