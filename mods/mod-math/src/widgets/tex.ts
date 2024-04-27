import type { AsyncWidgetResponse, WidgetOptions } from '@newcar/core'
import { AsyncWidget } from '@newcar/core'
import type { Canvas, CanvasKit, Paint, Path } from 'canvaskit-wasm'
import { mathjax } from 'mathjax-full/js/mathjax.js';
import { TeX } from 'mathjax-full/js/input/tex.js';
import { SVG } from 'mathjax-full/js/output/svg.js';
import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor.js';
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html.js';
import { svg2path } from '../utils/svg2path'

export class Tex extends AsyncWidget {
  path: Path
  paint: Paint
  convertTexToSVG: (tex: string) => any
  constructor(public tex: string, options?: WidgetOptions) {
    options ??= {}
    super(options)
  }

  async init(ck: CanvasKit): Promise<AsyncWidgetResponse> {
    this.path = new ck.Path()
    this.paint = new ck.Paint()
    this.paint.setColor(ck.WHITE)
    this.paint.setStrokeWidth(2)

    const adaptor = liteAdaptor();
    RegisterHTMLHandler(adaptor);

    const tex = new TeX({ packages: ['base', 'autoload', 'require', 'ams'] });
    const svg = new SVG({ fontCache: 'none' });
    const doc = mathjax.document('', { InputJax: tex, OutputJax: svg });

    this.convertTexToSVG = (texString: string) => {
      const node = doc.convert(texString, {
        display: true
      });
      return adaptor.outerHTML(node);
    }
    for (const path of svg2path(this.convertTexToSVG(this.tex)))
      this.path.addPath(ck.Path.MakeFromSVGString(path.path)!)

    return {
      status: 'ok'
    }
  }

  draw(canvas: Canvas): void {
    canvas.drawPath(this.path, this.paint)
  }
}
