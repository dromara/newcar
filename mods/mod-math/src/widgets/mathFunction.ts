import type { Base, BaseOptions, BaseStyle, ConvertToProp, Prop, Widget } from '@newcar/core'
import { changed, def, defineWidgetBuilder } from '@newcar/core'
import type { Shader } from '@newcar/utils'
import { Color, deepMerge } from '@newcar/utils'
import { createPath } from '@newcar/basic'
import type { Domain } from '../utils/domain'
import type { Range } from '../utils/range'

export interface MathFunctionOptions extends BaseOptions {
  divisionY?: number
  divisionX?: number
  style?: MathFunctionStyle
  numberRange?: Range
}

export interface MathFunctionStyle extends BaseStyle {
  color?: Color
  shader?: Shader
  width?: number
}

export interface MathFunction extends Base {
  divisionX: Prop<number>
  divisionY: Prop<number>
  numberRange: Prop<Range>
  domain: Prop<Domain>
  style: ConvertToProp<MathFunctionStyle>
}

export function createMathFunction(fn: (x: number) => number, domain: Domain, options: MathFunctionOptions) {
  return defineWidgetBuilder<MathFunction>((ck) => {
    options ??= {}
    options.style ??= {}

    const path = createPath(options)(ck)

    const fnProp = def(fn)
    const domainProp = def(domain)

    const divisionX = def(options.divisionX ?? 50)
    const divisionY = def(options.divisionY ?? 50)
    const numberRange: Prop<Range> = def(options.numberRange ?? [
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY,
    ])
    const style = {
      color: def(options.style.color ?? Color.WHITE),
      shader: def(options.style.shader),
      width: def(options.style.width ?? 2),
    }

    function reset() {
      path.path.moveTo(domain[0], fnProp.value(domainProp.value[0]))
      for (
        let x = domainProp.value[0];
        x <= domainProp.value[0] + (domainProp.value[1] - domainProp.value[0]) * path.progress.value;
        x += 1 / divisionX.value
      ) {
        const value = fnProp.value(x)
        path.path.lineTo(x, value)
      }
    }

    reset()

    changed(divisionX, reset)
    changed(divisionY, reset)
    changed(domainProp, reset)
    changed(fnProp, reset)
    changed(path.progress, reset)

    return deepMerge(path, {
      divisionX,
      divisionY,
      numberRange,
      domain: domainProp,
      style,
    })
  })
}
