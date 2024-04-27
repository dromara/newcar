import type { AsyncWidgetResponse, WidgetOptions } from '@newcar/core'
import { AsyncWidget } from '@newcar/core'
import type { Canvas, CanvasKit, Paint, Path } from 'canvaskit-wasm'
import /* @vite-ignore */texsvg from 'texsvg'

export class Tex extends AsyncWidget {
  path: Path
  paint: Paint
  constructor(public tex: string, options?: WidgetOptions) {
    options ??= {}
    super(options)
  }

  async init(ck: CanvasKit): Promise<AsyncWidgetResponse> {
    const pathString = await texsvg(this.tex)
    this.path = ck.Path.MakeFromSVGString(pathString)!
    this.paint = new ck.Paint()
    this.paint.setColor(ck.WHITE)

    return {
      status: 'ok'
    }
  }

  draw(canvas: Canvas): void {
    canvas.drawPath(this.path, this.paint)
  }
}
