import type { ConvertToProp, Ref } from '@newcar/core'
import { Widget, changed, reactive, ref } from '@newcar/core'
import type { Shader } from '@newcar/utils'
import { Color } from '@newcar/utils'
import type { FigureOptions, FigureStyle } from '@newcar/basic'
import { Arc, Line, Text } from '@newcar/basic'
import type { Canvas } from 'canvaskit-wasm'

export interface AngleOptions extends FigureOptions {
  style?: AngleStyle
  unit?: 'angle' | 'radian'
  sides?: [number, number]
}

export interface AngleStyle extends FigureStyle {
  degree?: boolean
  degreeColor?: Color
  degreeShader?: Shader
  arc?: boolean
  arcColor?: Color
  arcShader?: Shader
  arcRadius?: number
}

export class Angle extends Widget {
  declare style: ConvertToProp<AngleStyle>
  unit: Ref<'angle' | 'radian'>
  from: Ref<number>
  to: Ref<number>
  /**
   * The first item is the started side's length, the second item is the ended side's length.
   */
  sides: Ref<[number, number]>
  private startSide: Line
  private endSide: Line
  private arc: Arc
  private degree: Text

  constructor(from: number, to: number, options?: AngleOptions) {
    super(options)
    this.from = ref(from ?? 0)
    this.to = ref(to ?? 0)
    this.unit = ref(options.unit ?? 'angle')
    this.sides = ref(options.sides ?? [100, 100])
    this.style.degree = ref(options.style.degree ?? true)
    this.style.degreeColor = reactive(options.style.degreeColor ?? Color.WHITE)
    this.style.degreeShader = reactive(options.style.degreeShader)
    this.style.arc = ref(options.style.arc ?? true)
    this.style.arcColor = reactive(options.style.arcColor ?? Color.WHITE)
    this.style.arcShader = reactive(options.style.arcShader)
    this.style.arcRadius = ref(options.style.arcRadius ?? 50)
    this.startSide = new Line([0, 0], [this.sides.value[0], 0], {
      style: {
        rotation: this.from.value,
      },
    })
    this.endSide = new Line([0, 0], [this.sides.value[1], 0], {
      style: {
        rotation: this.to.value,
      },
    })
    this.arc = new Arc(this.style.arcRadius.value, this.from.value, this.to.value, {
      style: {
        // color: this.style.arcColor ?? Color.WHITE,
        // shader: this.style.arcShader,
        border: true,
        fill: false,
      },
    })
    this.degree = new Text(`${(this.to.value - this.from.value).toString()}°`, {
      style: {
        // color: this.style.degreeColor ?? Color.WHITE,
        // shader: this.style.degreeShader,
        fontSize: 15,
      },
      ...this.calculateTextPosition(0, 0, this.style.arcRadius.value, this.from.value, this.to.value),
    })
    this.add(this.startSide, this.endSide)
    if (this.style.arc.value)
      this.add(this.arc)
    if (this.style.degree.value)
      this.add(this.degree)

    changed(this.from, () => {
      this.startSide.style.rotation.value = this.from.value
      this.degree.text.value = `${(this.to.value - this.from.value).toString()}°`
      const newPosition = this.calculateTextPosition(0, 0, this.style.arcRadius.value, this.from.value, this.to.value)
      this.degree.x.value = newPosition.x
      this.degree.y.value = newPosition.y
      this.arc.from.value = this.from.value
    })
    changed(this.to, () => {
      this.endSide.style.rotation.value = this.to.value
      this.degree.text.value = `${(this.to.value - this.from.value).toString()}°`
      const newPosition = this.calculateTextPosition(0, 0, this.style.arcRadius.value, this.from.value, this.to.value)
      this.degree.x.value = newPosition.x
      this.degree.y.value = newPosition.y
      this.arc.to.value = this.to.value
    })
    changed(this.sides, () => {
      this.startSide.from.value = [this.sides.value[0], 0]
    })
    changed(this.unit, () => {
      if (this.unit.value === 'angle') {
        this.arc.from.value = this.from.value
        this.arc.to.value = this.to.value
      }
      else {
        this.arc.from.value = this.from.value * 180 / Math.PI
        this.arc.to.value = this.to.value * 180 / Math.PI
      }
    })
    changed(this.style.arcRadius, () => {
      this.arc.radius.value = this.style.arcRadius.value
    })
    // changed(this.style.arcColor, () => {
    //   this.arc.style.color = this.style.arcColor
    // })
    // changed(this.style.arcShader, () => {
    //   this.arc.style.shader = this.style.arcShader
    // })
    changed(this.style.degree, () => {
      this.degree.display.value = this.style.degree.value
    })
    // changed(this.style.degreeColor, () => {
    //   this.degree.style.color = this.style.degreeColor
    // })
    // changed(this.style.degreeShader, () => {
    //   this.degree.style.shader = this.style.degreeShader
    // })
  }

  private calculateTextPosition(
    centerX: number,
    centerY: number,
    radius: number,
    fromAngle: number,
    toAngle: number,
  ) {
    // Convert angles from degrees to radians
    const fromRad = (fromAngle * Math.PI) / 180
    const toRad = (toAngle * Math.PI) / 180

    // Calculate the middle angle in radians
    let midRad = (fromRad + toRad) / 2

    // Adjust if the angles are on opposite sides of the circle
    if (fromAngle > toAngle) {
      midRad = (fromRad + (toRad + 2 * Math.PI)) / 2
    }

    // Calculate the coordinates of the midpoint
    const midX = centerX + radius * Math.cos(midRad)
    const midY = centerY + radius * Math.sin(midRad)

    return { x: midX, y: midY }
  }

  draw(canvas: Canvas): void {
    canvas.save()
    canvas.scale(1, -1)
    super.draw(canvas)
    canvas.restore()
  }
}
