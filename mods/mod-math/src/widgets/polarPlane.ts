import { Circle, Line } from '@newcar/basic'
import { Widget, changed, ref } from '@newcar/core'
import type { ConvertToProp, Ref, WidgetOptions, WidgetStyle } from '@newcar/core'

export interface PolarPlaneOptions extends WidgetOptions {
  style?: PolarPlaneStyle
  radiusInterval?: number
  radianInterval?: number
  levelInterval?: number
}

export interface PolarPlaneStyle extends WidgetStyle { }

export class PolarPlane extends Widget {
  radius: Ref<number>
  radiusInterval: Ref<number>
  radianInterval: Ref<number>
  declare style: ConvertToProp<PolarPlaneStyle>

  private axisX: Line
  private axisY: Line
  private axisR: Array<Line> = []
  private circles: Array<Circle> = []

  constructor(radius: number, options?: PolarPlaneOptions) {
    super(options)
    this.radius = ref(radius)
    this.radiusInterval = ref(options.radiusInterval ?? 50)
    this.radianInterval = ref(options.radianInterval ?? 30)

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

    this.add(...this.circles, ...this.axisR)

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
