import type { BaseOptions, BaseStyle } from '@newcar/core'
import { createBase, def, defineWidgetBuilder } from '@newcar/core'
import { Color, deepMerge } from '@newcar/utils'
import { createArrow, createLine, createText } from '@newcar/basic'
import type { Line, Text } from '@newcar/basic'
import type { Trend } from './numberAxis'

export interface NumberPlaneOptions extends BaseOptions {
  style?: NumberPlaneStyle
  divisionX?: number
  divisionY?: number
  trendX?: Trend
  trendY?: Trend
}

export interface NumberPlaneStyle extends BaseStyle {
  colorX?: Color
  colorY?: Color
  textColorX?: Color
  textColorY?: Color
  textSizeX?: number
  textSizeY?: number
  textsX?: boolean
  textsY?: boolean
  ticksX?: boolean
  ticksY?: boolean
  tickColorX?: Color
  tickColorY?: Color
  grid?: boolean
  gridColor?: Color
  gridWidth?: number
}

export function createNumberPlane(
  lengthX: number[],
  lengthY: number[],
  options?: NumberPlaneOptions,
) {
  return defineWidgetBuilder((ck) => {
    options ??= {}
    options.style ??= {}
    const base = createBase(options)(ck)

    const lengthXProp = def(lengthX)
    const lengthYProp = def(lengthY)

    const divisionX = def(options.divisionX ?? 50)
    const divisionY = def(options.divisionY ?? 50)
    const trendX = def(options.trendX ?? ((x: number) => x / 50))
    const trendY = def(options.trendY ?? ((y: number) => y / 50))

    const style = {
      ...base.style,
      colorX: def(options.style.colorX ?? Color.WHITE),
      colorY: def(options.style.colorY ?? Color.WHITE),
      textColorX: def(options.style.textColorX ?? Color.WHITE),
      textColorY: def(options.style.textColorY ?? Color.WHITE),
      textSizeX: def(options.style.textSizeX ?? 10),
      textSizeY: def(options.style.textSizeY ?? 10),
      tickColorX: def(options.style.tickColorX ?? Color.WHITE),
      tickColorY: def(options.style.tickColorY ?? Color.WHITE),
      gridColor: def(options.style.gridColor ?? Color.WHITE),
      gridWidth: def(options.style.gridWidth ?? 1),
      textsX: def(options.style.textsX ?? true),
      textsY: def(options.style.textsY ?? true),
      ticksX: def(options.style.ticksX ?? true),
      ticksY: def(options.style.ticksY ?? true),
      grid: def(options.style.grid ?? true),
    }

    const axisX = createArrow([lengthXProp.value[0], 0], [lengthXProp.value[1], 0], {
      style: {
        color: style.colorX.value,
      },
    })(ck)
    const axisY = createArrow([0, lengthYProp.value[1]], [0, lengthYProp.value[0]], {
      style: {
        color: style.colorY.value,
      },
    })(ck)

    const ticksX: Line[] = []
    const ticksY: Line[] = []
    const textsX: Text[] = []
    const textsY: Text[] = []
    const grid: Line[] = []

    for (let x = lengthX[0] + (lengthX[1] - lengthX[0]) % divisionX.value; x <= lengthX[1]; x += divisionX.value) {
      if (style.ticksX) {
        ticksX.push(createLine([x, -5], [x, 5], {
          style: {
            color: style.tickColorX.value,
          },
        })(ck))
      }
      if (x !== 0 && style.textsX) {
        textsX.push(createText(trendX.value(x).toString(), {
          x: x - (style.textSizeX.value / 2),
          y: 10,
          style: {
            fontSize: style.textSizeX.value,
            color: style.textColorX.value,
            // Note: the rotation is reversed because the canvas is flipped
            rotation: -style.rotation.value,
          },
        })(ck))
      }
      if (style.grid) {
        grid.push(createLine([x, lengthY[0]], [x, lengthY[1]], {
          style: {
            color: style.gridColor.value,
            width: style.gridWidth.value,
          },
          progress: base.progress.value,
        })(ck))
      }
    }

    for (let y = lengthY[0] + (lengthY[1] - lengthY[0]) % divisionY.value; y <= lengthY[1]; y += divisionY.value) {
      if (style.ticksY) {
        ticksY.push(createLine([-5, y], [5, y], {
          style: {
            color: style.tickColorY.value,
          },
        })(ck))
      }
      if (y !== 0 && style.textsY) {
        textsY.push(createText(trendY.value(y).toString(), {
          x: 10,
          y: (style.textSizeY.value / 2) - y,
          style: {
            fontSize: style.textSizeY.value,
            color: style.textColorY.value,
            // Note: the rotation is reversed because the canvas is flipped
            rotation: -style.rotation,
          },
        })(ck))
      }
      if (style.grid) {
        grid.push(createLine([lengthX[0], y], [lengthX[1], y], {
          style: {
            color: style.gridColor.value,
            width: style.gridWidth.value,
          },
          progress: base.progress.value,
        })(ck))
      }
    }

    const originText = createText(trendX.value(0).toString(), {
      x: style.textSizeX.value / 4,
      y: style.textSizeX.value / 4,
      style: {
        fontSize: style.textSizeX.value,
        color: style.textColorX.value,
        // Note: the rotation is reversed because the canvas is flipped
        rotation: -style.rotation.value,
      },
    })(ck)

    base.add(axisX, axisY, ...ticksX, ...ticksY, ...textsX, ...textsY, ...grid)
    if (style.textsX)
      base.add(originText)

    return deepMerge(base, {
      divisionX,
      divisionY,
      lengthX: lengthXProp,
      lengthY: lengthYProp,
      style,
      trendX,
      trendY,
    })
  })
}
