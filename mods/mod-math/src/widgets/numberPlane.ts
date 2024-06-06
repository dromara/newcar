import type { BaseOptions, BaseStyle } from '@newcar/core'
import { changed, createBase, def, defineWidgetBuilder } from '@newcar/core'
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

    let ticksX: Line[] = []
    let ticksY: Line[] = []
    let textsX: Text[] = []
    let textsY: Text[] = []
    let grid: Line[] = []

    for (let x = lengthX[0] + (lengthX[1] - lengthX[0]) % divisionX.value; x <= lengthX[1]; x += divisionX.value) {
      if (style.ticksX.value) {
        ticksX.push(createLine([x, -5], [x, 5], {
          style: {
            color: style.tickColorX.value,
          },
        })(ck))
      }
      if (x !== 0 && style.textsX.value) {
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
      if (style.ticksY.value) {
        ticksY.push(createLine([-5, y], [5, y], {
          style: {
            color: style.tickColorY.value,
          },
        })(ck))
      }
      if (y !== 0 && style.textsY.value) {
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

    changed(lengthXProp, (v) => {
      axisX.from.value = [v.value[0], 0]
      axisX.to.value = [v.value[1], 0]
    })
    changed(lengthYProp, (v) => {
      axisY.from.value = [0, v.value[0]]
      axisY.to.value = [0, v.value[1]]
    })
    changed(divisionX, (v) => {
      textsX = []
      ticksX = []
      grid = []
      for (let x = lengthXProp.value[0] + (lengthXProp.value[1] - lengthXProp.value[0]) % v.value; x <= lengthXProp.value[1]; x += v.value) {
        if (style.ticksX.value) {
          ticksX.push(createLine([x, -5], [x, 5], {
            style: {
              color: style.tickColorX.value,
            },
          })(ck))
        }
        if (x !== 0 && style.textsX.value) {
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
      }
    })
    changed(divisionY, (v) => {
      textsY = []
      ticksY = []
      grid = []
      for (let y = lengthYProp.value[0] + (lengthYProp.value[1] - lengthYProp.value[0]) % v.value; y <= lengthYProp.value[1]; y += v.value) {
        if (style.ticksY.value) {
          ticksY.push(createLine([-5, y], [5, y], {
            style: {
              color: style.tickColorY.value,
            },
          })(ck))
        }
        if (y !== 0 && style.textsY.value) {
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
      }
    })
    changed(style.rotation, (v) => {
      for (const text of textsX) {
        text.style.rotation.value = -v.value
      }
      for (const text of textsY) {
        text.style.rotation.value = -v.value
      }
    })
    changed(trendX, (v) => {
      for (const text of textsX) {
        text.text.value = v.value(text.x.value).toString()
      }
    })
    changed(trendY, (v) => {
      for (const text of textsY) {
        text.text.value = v.value(text.y.value).toString()
      }
    })
    changed(style.textColorX, (v) => {
      for (const text of textsX) {
        text.style.color.value = v.value
      }
    })
    changed(style.textColorY, (v) => {
      for (const text of textsY) {
        text.style.color.value = v.value
      }
    })
    changed(style.textSizeX, (v) => {
      for (const text of textsX) {
        text.style.fontSize.value = v.value
      }
    })
    changed(style.textSizeY, (v) => {
      for (const text of textsY) {
        text.style.fontSize.value = v.value
      }
    })
    changed(style.tickColorX, (v) => {
      for (const line of ticksX) {
        line.style.color.value = v.value
      }
    })
    changed(style.tickColorY, (v) => {
      for (const line of ticksY) {
        line.style.color.value = v.value
      }
    })
    changed(style.gridColor, (v) => {
      for (const line of grid) {
        line.style.color.value = v.value
      }
    })
    changed(style.gridWidth, (v) => {
      for (const line of grid) {
        line.style.width.value = v.value
      }
    })
    changed(style.textsX, (v) => {
      for (const text of textsX) {
        text.display.value = v.value
      }
    })
    changed(style.textsY, (v) => {
      for (const text of textsY) {
        text.display.value = v.value
      }
    })
    changed(style.ticksX, (v) => {
      for (const line of ticksX) {
        line.display.value = v.value
      }
    })
    changed(style.ticksY, (v) => {
      for (const line of ticksY) {
        line.display.value = v.value
      }
    })
    changed(style.grid, (v) => {
      for (const line of grid) {
        line.display.value = v.value
      }
    })
    changed(base.progress, (v) => {
      for (const g of grid)
        g.progress.value = v.value
      for (const tick of ticksX)
        tick.progress.value = v.value
      for (const tick of ticksY)
        tick.progress.value = v.value
      axisX.progress.value = v.value
      axisY.progress.value = v.value
    })

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
