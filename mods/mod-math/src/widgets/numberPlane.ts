import { Arrow, Line, Text } from '@newcar/basic'
import type { ConvertToProp, Ref, WidgetOptions, WidgetStyle } from '@newcar/core'
import { Widget, changed, reactive, ref } from '@newcar/core'
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
  declare style: ConvertToProp<NumberPlaneStyle>
  axisX: Arrow
  axisY: Arrow
  ticksX: Line[] = []
  ticksY: Line[] = []
  textsX: Text[] = []
  textsY: Text[] = []
  grid: Line[] = []
  divisionX: Ref<number>
  divisionY: Ref<number>
  trendX: Ref<Trend>
  trendY: Ref<Trend>
  originText: Text

  constructor(public lengthX: [number, number], public lengthY: [number, number], options?: NumberPlaneOptions) {
    options ??= {}
    options.style ??= {}
    super(options)

    this.divisionX = ref(options.divisionX ?? 50)
    this.divisionY = ref(options.divisionY ?? 50)
    this.trendX = ref(options.trendsX ?? (x => x / 50))
    this.trendY = ref(options.trendsY ?? (x => x / 50))
    this.style.colorX = reactive(options.style?.colorX ?? Color.WHITE)
    this.style.colorY = reactive(options.style?.colorY ?? Color.WHITE)
    this.style.textColorX = reactive(options.style?.textColorX ?? Color.WHITE)
    this.style.textColorY = reactive(options.style?.textColorY ?? Color.WHITE)
    this.style.textSizeX = ref(options.style?.textSizeX ?? 20)
    this.style.textSizeY = ref(options.style?.textSizeY ?? 20)
    this.style.textsX = ref(options.style?.textsX ?? true)
    this.style.textsY = ref(options.style?.textsY ?? true)
    this.style.ticksX = ref(options.style?.ticksX ?? true)
    this.style.ticksY = ref(options.style?.ticksY ?? true)
    this.style.tickColorX = reactive(options.style?.tickColorX ?? Color.WHITE)
    this.style.tickColorY = reactive(options.style?.tickColorY ?? Color.WHITE)
    this.style.grid = ref(options.style?.grid ?? true)
    this.style.gridColor = reactive(options.style?.gridColor ?? Color.WHITE)
    this.style.gridWidth = ref(options.style?.gridWidth ?? 1)
    this.axisX = new Arrow([this.lengthX[0], 0], [this.lengthX[1], 0], { style: { color: this.style.colorX } })
    this.axisY = new Arrow([0, this.lengthY[1]], [0, this.lengthY[0]], { style: { color: this.style.colorY } })

    this.createTicksAndTexts()

    this.originText = new Text(this.trendX.value(0).toString(), {
      x: this.style.textSizeX.value / 4,
      y: this.style.textSizeX.value / 4,
      style: {
        fontSize: this.style.textSizeX.value,
        fillColor: this.style.textColorX,
        rotation: -this.style.rotation.value,
      },
    })

    this.add(this.axisX, this.axisY, ...this.ticksX, ...this.ticksY, ...this.textsX, ...this.textsY, ...this.grid, this.originText)

    this.setupReactiveChanges()
  }

  private createTicksAndTexts() {
    for (let x = this.lengthX[0] + (this.lengthX[1] - this.lengthX[0]) % this.divisionX.value; x <= this.lengthX[1]; x += this.divisionX.value) {
      if (this.style.ticksX.value) {
        this.ticksX.push(new Line([x, -5], [x, 5], { style: { color: this.style.tickColorX } }))
      }
      if (x !== 0 && this.style.textsX.value) {
        this.textsX.push(new Text(this.trendX.value(x).toString(), {
          x: x - (this.style.textSizeX.value / 2),
          y: 10,
          style: {
            fontSize: this.style.textSizeX.value,
            fillColor: this.style.textColorX,
            rotation: -this.style.rotation.value,
          },
        }))
      }
      if (this.style.grid.value) {
        this.grid.push(new Line([x, this.lengthY[0]], [x, this.lengthY[1]], {
          style: {
            color: this.style.gridColor,
            width: this.style.gridWidth.value,
          },
          progress: this.progress.value,
        }))
      }
    }

    for (let y = this.lengthY[0] + (this.lengthY[1] - this.lengthY[0]) % this.divisionY.value; y <= this.lengthY[1]; y += this.divisionY.value) {
      if (this.style.ticksY.value) {
        this.ticksY.push(new Line([-5, y], [5, y], { style: { color: this.style.tickColorY } }))
      }
      if (y !== 0 && this.style.textsY.value) {
        this.textsY.push(new Text(this.trendY.value(y).toString(), {
          x: 10,
          y: (this.style.textSizeY.value / 2) - y,
          style: {
            fontSize: this.style.textSizeY.value,
            fillColor: this.style.textColorY,
            rotation: -this.style.rotation.value,
          },
        }))
      }
      if (this.style.grid.value) {
        this.grid.push(new Line([this.lengthX[0], y], [this.lengthX[1], y], {
          style: {
            color: this.style.gridColor,
            width: this.style.gridWidth.value,
          },
          progress: this.progress.value,
        }))
      }
    }
  }

  private setupReactiveChanges() {
    changed(this.style.colorX, v => this.axisX.style.color = v)
    changed(this.style.colorY, v => this.axisY.style.color = v)
    changed(this.style.textColorX, v => this.textsX.forEach(text => text.style.fillColor = v))
    changed(this.style.textColorY, v => this.textsY.forEach(text => text.style.fillColor = v))
    changed(this.style.textSizeX, v => this.textsX.forEach(text => text.style.fontSize = v))
    changed(this.style.textSizeY, v => this.textsY.forEach(text => text.style.fontSize = v))
    changed(this.style.tickColorX, v => this.ticksX.forEach(tick => tick.style.color = v))
    changed(this.style.tickColorY, v => this.ticksY.forEach(tick => tick.style.color = v))
    changed(this.style.gridColor, v => this.grid.forEach(gridItem => gridItem.style.color = v))
    changed(this.style.gridWidth, v => this.grid.forEach(gridItem => gridItem.style.width = v))
    changed(this.progress, (v) => {
      this.axisX.progress.value = v.value
      this.axisY.progress.value = v.value
      this.ticksX.forEach(tick => tick.progress.value = v.value)
      this.grid.forEach(gridItem => gridItem.progress.value = v.value)
    })
    changed(this.style.rotation, (v) => {
      this.textsX.forEach(text => text.style.rotation.value = -v.value)
      this.textsY.forEach(text => text.style.rotation.value = -v.value)
      this.originText.style.rotation.value = -v.value
    })
    changed(this.divisionX, this.createTicksAndTexts.bind(this))
    changed(this.divisionY, this.createTicksAndTexts.bind(this))
    changed(this.trendX, this.createTicksAndTexts.bind(this))
    changed(this.trendY, this.createTicksAndTexts.bind(this))
  }
}
