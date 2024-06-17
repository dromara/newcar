import { Circle, Line, Text } from '@newcar/basic'
import { Widget, changed, reactive, ref } from '@newcar/core'
import type { ConvertToProp, Ref, WidgetOptions, WidgetStyle } from '@newcar/core'
import { Color } from '@newcar/utils'
import type { Trend } from './numberAxis'

export interface PolarPlaneOptions extends WidgetOptions {
  style?: PolarPlaneStyle
  radiusInterval?: number
  radianInterval?: number
  levelInterval?: number
  trend?: Trend
}

export interface PolarPlaneStyle extends WidgetStyle {
  textsOnAxis?: boolean
  textsOnCircle?: boolean
  textSize?: number
  textColor?: Color
}

export class PolarPlane extends Widget {
  radius: Ref<number>
  radiusInterval: Ref<number>
  radianInterval: Ref<number>
  trend: Ref<Trend>
  declare style: ConvertToProp<PolarPlaneStyle>

  private axisX: Line
  private axisY: Line
  private axisR: Array<Line> = []
  private circles: Array<Circle> = []
  private textsOnAxis: Array<Text> = []
  private textsOnCircle: Array<Text> = []

  constructor(radius: number, options?: PolarPlaneOptions) {
    super(options)
    this.radius = ref(radius)
    this.radiusInterval = ref(options.radiusInterval ?? 50)
    this.radianInterval = ref(options.radianInterval ?? 360 / 16)
    this.trend = ref(options.trend ?? (x => x / 50))
    this.style.textColor = reactive(options.style?.textColor ?? Color.WHITE)
    this.style.textSize = ref(options.style?.textSize ?? 20)
    this.style.textsOnAxis = ref(options.style?.textsOnAxis ?? true)
    this.style.textsOnCircle = ref(options.style?.textsOnCircle ?? true)

    this.axisX = new Line([-this.radius.value, 0], [this.radius.value, 0])
    this.axisY = new Line([0, -this.radius.value], [0, this.radius.value])

    this.add(this.axisX, this.axisY)

    for (let r = 0; r <= this.radius.value; r += this.radiusInterval.value) {
      this.circles.push(
        new Circle(r, {
          style: {
            border: true,
            fill: false,
            borderWidth: 1,
          },
        }),
      )
      if (this.style.textsOnAxis.value) {
        this.textsOnAxis.push(
          new Text(this.trend.value(r).toString(), {
            x: r,
            y: 5,
            style: {
              fontSize: this.style.textSize.value,
            },
          }),
        )
      }
    }

    for (let i = 0; i < 360; i += this.radianInterval.value) {
      this.axisR.push(
        new Line([0, 0], [this.radius.value, 0], {
          style: {
            rotation: i,
            width: 1,
          },
        }),
      )
      if (this.style.textsOnCircle) {
        this.textsOnCircle.push(
          new Text(`${(i / 180).toFixed(2)}π`, {
            x: this.radius.value * Math.sin(i * Math.PI / 180),
            y: this.radius.value * Math.cos(i * Math.PI / 180),
            style: {
              fontSize: this.style.textSize.value,
            },
          }),
        )
      }
    }

    this.add(...this.circles, ...this.axisR, ...this.textsOnAxis, ...this.textsOnCircle)

    changed(this.radius, (_) => {
      this.axisX.to.value = [this.radius.value, 0]
      this.axisY.to.value = [0, this.radius.value]
      this.axisR = []
      this.circles = []

      for (let r = 0; r <= this.radius.value; r += this.radiusInterval.value) {
        this.circles.push(
          new Circle(r, {
            style: {
              border: true,
              fill: false,
              borderWidth: 1,
            },
          }),
        )
      }

      for (let i = 0; i <= 360; i += this.radianInterval.value) {
        this.axisR.push(
          new Line([0, 0], [this.radius.value, 0], {
            style: {
              rotation: i,
              width: 1,
            },
          }),
        )
      }
    })
  }
}
