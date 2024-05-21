import { Arrow, Line, Text } from '@newcar/basic'
import type { WidgetOptions, WidgetStyle } from '@newcar/core'
import { Widget } from '@newcar/core'
import { Color } from '@newcar/utils'
import type { CanvasKit } from 'canvaskit-wasm'
import type { Trend } from './numberAxis'

export interface NumberPlaneOptions extends WidgetOptions {
  style?: NumberPlaneStyle
  divisionX?: number
  divisionY?: number
  trendsX?: Trend
  trendsY?: Trend
}

export interface NumberPlaneStyle extends WidgetStyle {
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

export class NumberPlane extends Widget {
  declare style: NumberPlaneStyle
  axisX: Arrow
  axisY: Arrow
  ticksX: Line[]
  ticksY: Line[]
  textsX: Text[]
  textsY: Text[]
  grid: Line[]
  divisionX: number
  divisionY: number
  trendX: Trend
  trendY: Trend
  originText: Text
  constructor(
    public lengthX: [number, number],
    public lengthY: [number, number],
    options?: NumberPlaneOptions,
  ) {
    options ??= {}
    super(options)
    this.divisionX = options.divisionX ?? 50
    this.divisionY = options.divisionY ?? 50
    this.trendX = options.trendsX ?? (x => x / 50)
    this.trendY = options.trendsY ?? (x => x / 50)
    this.ticksX = []
    this.ticksY = []
    this.textsX = []
    this.textsY = []
    this.grid = []
    options.style ??= {}
    this.style.colorX = options.style.colorX ?? Color.WHITE
    this.style.colorY = options.style.colorY ?? Color.WHITE
    this.style.textColorX = options.style.textColorX ?? Color.WHITE
    this.style.textColorY = options.style.textColorY ?? Color.WHITE
    this.style.textSizeX = options.style.textSizeX ?? 20
    this.style.textSizeY = options.style.textSizeY ?? 20
    this.style.textsX = options.style.textsX ?? true
    this.style.textsY = options.style.textsY ?? true
    this.style.ticksX = options.style.ticksX ?? true
    this.style.ticksY = options.style.ticksY ?? true
    this.style.tickColorX = options.style.tickColorX ?? Color.WHITE
    this.style.tickColorY = options.style.tickColorY ?? Color.WHITE
    this.style.grid = options.style.grid ?? true
    this.style.gridColor = options.style.gridColor ?? Color.WHITE
    this.style.gridWidth = options.style.gridWidth ?? 1

    this.axisX = new Arrow([this.lengthX[0], 0], [this.lengthX[1], 0], {
      style: {
        color: this.style.colorX,
      },
    })
    this.axisY = new Arrow([0, this.lengthY[1]], [0, this.lengthY[0]], {
      style: {
        color: this.style.colorY,
      },
    })

    for (let x = this.lengthX[0] + (this.lengthX[1] - this.lengthX[0]) % this.divisionX; x <= this.lengthX[1]; x += this.divisionX) {
      if (this.style.ticksX) {
        this.ticksX.push(new Line([x, -5], [x, 5], {
          style: {
            color: this.style.tickColorX,
          },
        }))
      }
      if (x !== 0 && this.style.textsX) {
        this.textsX.push(new Text([{
          text: this.trendX(x).toString(),
          style: {
            fontSize: this.style.textSizeX,
          },
        }], {
          x: x - (this.style.textSizeX / 2),
          y: 10,
          style: {
            textAlign: 'center',
            width: this.style.textSizeX,
            fillColor: this.style.textColorX,
            // Note: the rotation is reversed because the canvas is flipped
            rotation: -this.style.rotation,
          },
        }))
      }
      if (this.style.grid) {
        this.grid.push(new Line([x, this.lengthY[0]], [x, this.lengthY[1]], {
          style: {
            color: this.style.gridColor,
            width: this.style.gridWidth,
          },
          progress: this.progress,
        }))
      }
    }

    for (let y = this.lengthY[0] + (this.lengthY[1] - this.lengthY[0]) % this.divisionY; y <= this.lengthY[1]; y += this.divisionY) {
      if (this.style.ticksY) {
        this.ticksY.push(new Line([-5, y], [5, y], {
          style: {
            color: this.style.tickColorY,
          },
        }))
      }
      if (y !== 0 && this.style.textsY) {
        this.textsY.push(new Text([{
          text: this.trendY(y).toString(),
          style: {
            fontSize: this.style.textSizeY,
          },
        }], {
          x: 10,
          y: (this.style.textSizeY / 2) - y,
          style: {
            textAlign: 'center',
            width: this.style.textSizeY,
            fillColor: this.style.textColorY,
            // Note: the rotation is reversed because the canvas is flipped
            rotation: -this.style.rotation,
          },
        }))
      }
      if (this.style.grid) {
        this.grid.push(new Line([this.lengthX[0], y], [this.lengthX[1], y], {
          style: {
            color: this.style.gridColor,
            width: this.style.gridWidth,
          },
          progress: this.progress,
        }))
      }
    }

    this.originText = new Text([{
      text: this.trendX(0).toString(),
      style: {
        fontSize: this.style.textSizeX,
      },
    }], {
      x: this.style.textSizeX / 4,
      y: this.style.textSizeX / 4,
      style: {
        textAlign: 'center',
        width: this.style.textSizeX,
        fillColor: this.style.textColorX,
        // Note: the rotation is reversed because the canvas is flipped
        rotation: -this.style.rotation,
      },
    })

    this.add(this.axisX, this.axisY, ...this.ticksX, ...this.ticksY, ...this.textsX, ...this.textsY, ...this.grid)
    if (this.style.textsX)
      this.add(this.originText)
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    switch (propertyChanged) {
      case 'style.colorX':
        this.axisX.style.color = this.style.colorX
        break
      case 'style.colorY':
        this.axisY.style.color = this.style.colorY
        break
      case 'style.textColorX':
        for (const text of this.textsX)
          text.style.fillColor = this.style.textColorX
        break
      case 'style.textColorY':
        for (const text of this.textsY)
          text.style.fillColor = this.style.textColorY
        break
      case 'style.textSizeX':
        for (const text of this.textsX)
          text.text[0].style.fontSize = this.style.textSizeX
        break
      case 'style.textSizeY':
        for (const text of this.textsY)
          text.text[0].style.fontSize = this.style.textSizeY
        break
      case 'style.ticksX':
        for (const tick of this.ticksX)
          tick.style.color = this.style.tickColorX
        break
      case 'style.ticksY':
        for (const tick of this.ticksY)
          tick.style.color = this.style.tickColorY
        break
      case 'style.grid':
        for (const gridItem of this.grid)
          gridItem.style.color = this.style.gridColor
        break
      case 'style.gridWidth':
        for (const gridItem of this.grid)
          gridItem.style.width = this.style.gridWidth
        break
      case 'progress':
        this.axisX.progress = this.progress
        this.axisY.progress = this.progress
        for (const tick of this.ticksX)
          tick.progress = this.progress
        for (const gridItem of this.grid)
          gridItem.progress = this.progress
        break
      case 'style.rotation':
        for (const text of this.textsX)
          text.style.rotation = -this.style.rotation
        for (const text of this.textsY)
          text.style.rotation = -this.style.rotation
        this.originText.style.rotation = -this.style.rotation
    }
  }
}
