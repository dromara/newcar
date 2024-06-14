import type { ConvertToProp, Ref, WidgetOptions, WidgetRange, WidgetStyle } from '@newcar/core'
import { Widget, changed, reactive, ref } from '@newcar/core'
import type { Shader } from '@newcar/utils'
import { Color } from '@newcar/utils'
import type { Canvas, CanvasKit, Paint, Path } from 'canvaskit-wasm'
import type { Domain } from '../utils/domain'
import type { Range } from '../utils/range'

export interface MathFunctionOptions extends WidgetOptions {
  divisionY?: number
  divisionX?: number
  lineWidth?: number
  style?: MathFunctionStyle
  numberRange?: Range
}

export interface MathFunctionStyle extends WidgetStyle {
  color?: Color
  shader?: Shader
  width?: number
}

export class MathFunction extends Widget {
  declare style: ConvertToProp<MathFunctionStyle>
  private path: Path
  private paint: Paint
  numberRange: Ref<Range>
  divisionX: Ref<number>
  divisionY: Ref<number>
  fn: Ref<(x: number) => number>
  domain: Ref<Domain>

  constructor(
    fn: (x: number) => number,
    domain: Domain,
    options?: MathFunctionOptions,
  ) {
    options ??= {}
    super(options)
    this.numberRange = ref(options.numberRange ?? [
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY,
    ])
    this.fn = ref(fn)
    this.domain = ref(domain)
    this.divisionX = ref(options.divisionX ?? 50)
    this.divisionY = ref(options.divisionY ?? 50)
    options.style ??= {}
    this.style.width = ref(options.style.width ?? 2)
    this.style.color = reactive(options.style.color ?? Color.WHITE)
    this.style.shader = reactive(options.style.shader)
  }

  init(ck: CanvasKit) {
    this.paint = new ck.Paint()
    this.paint.setColor(this.style.color!.toFloat4())
    this.paint.setShader(this.style.shader?.toCanvasKitShader(ck) ?? null)
    this.paint.setStyle(ck.PaintStyle.Stroke)
    this.paint.setStrokeWidth((this.style.width.value! / this.divisionX.value) * 2)
    this.path = new ck.Path()
    this.path.moveTo(this.domain.value[0], this.fn.value(this.domain.value[0]))
    for (
      let x = this.domain.value[0];
      x <= this.domain.value[0] + (this.domain.value[1] - this.domain.value[0]) * this.progress.value;
      x += 1 / this.divisionX.value
    ) {
      const value = this.fn.value(x)
      this.path.lineTo(x, value)
    }

    function reset(this: MathFunction) {
      this.path.reset()
      this.path.moveTo(this.domain.value[0], this.fn.value(this.domain.value[0]))
      for (
        let x = this.domain.value[0];
        x
        <= this.domain.value[0] + (this.domain.value[1] - this.domain.value[0]) * this.progress.value;
        x += 1 / this.divisionX.value
      ) {
        const value = this.fn.value(x)
        this.path.lineTo(x, value)
      }
    }

    changed(this.fn, reset.bind(this))
    changed(this.domain, reset.bind(this))
    changed(this.numberRange, reset.bind(this))
    changed(this.divisionX, reset.bind(this))
    changed(this.divisionY, reset.bind(this))
    changed(this.progress, reset.bind(this))
    changed(this.style.color, () => {
      this.paint.setColor(this.style.color!.toFloat4())
    })
    changed(this.style.shader, () => {
      this.paint.setShader(this.style.shader?.toCanvasKitShader(ck) ?? null)
    })
    changed(this.style.width, () => {
      this.paint.setStrokeWidth((this.style.width.value! / this.divisionX.value) * 2)
    })
  }

  draw(canvas: Canvas): void {
    canvas.scale(this.divisionX.value, -this.divisionY.value)
    canvas.drawPath(this.path, this.paint)
  }

  calculateIn(x: number, y: number): boolean {
    return this.path.contains(x, y)
  }

  calculateRange(): WidgetRange {
    const bounds = this.path.computeTightBounds()
    return [...bounds] as WidgetRange
  }
}
