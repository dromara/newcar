export type LengthUnitType = 'raw' | 'percent'

export class Length {
  constructor(public type: LengthUnitType, public value: number) {}

  resolve(origin: number): number {
    switch (this.type) {
      case 'raw':
        return origin
      case 'percent':
        return this.value * origin
    }
  }
}

export function rl(value: number) {
  return new Length('raw', value)
}

export function pl(value: number) {
  return new Length('percent', value)
}

export class Position {
  constructor(public type: LengthUnitType, public x: number, public y: number) {}

  resolve(width: number, height: number): [number, number] {
    switch (this.type) {
      case 'raw':
        return [this.x, this.y]
      case 'percent':
        return [this.x * width, this.y * height]
    }
  }
}

export function rp(x: number, y: number) {
  return new Position('raw', x, y)
}

export function pp(x: number, y: number) {
  return new Position('percent', x, y)
}
