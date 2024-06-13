import type { App } from './app'

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

export function r(value: number) {
  return new Length('raw', value)
}

export function p(value: number) {
  return new Length('percent', value)
}

export class Position {
  constructor(public type: LengthUnitType, public x: number, public y: number) {}

  resolve(originX: number, originY: number): [number, number] {
    switch (this.type) {
      case 'raw':
        return [this.x, this.y]
      case 'percent':
        return [this.x * originX, this.y * originY]
    }
  }
}

export function rp(value: number) {
  return new Length('raw', value)
}

export function pp(value: number) {
  return new Length('percent', value)
}
