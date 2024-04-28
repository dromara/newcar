/**
 * Timing functions.
 * @see https://www.desmos.com/calculator/yasltaa9um
 */

/**
 * A continuous function that passes through points (0,0) and (1,1).
 * @param x The independent variable from 0 to 1.
 * @returns The dependent variable of x.
 */
export type TimingFunction = (x: number) => number

const c = 1.701_58
const n = 7.5625
const d = 2.75

function invent(f: TimingFunction): TimingFunction {
  return (x: number): number => 1 - f(1 - x)
}

function solve(
  easeIn: TimingFunction,
  easeOut?: TimingFunction,
): TimingFunction {
  easeOut ??= invent(easeIn)

  return (x: number): number =>
    x < 0.5 ? easeIn(x * 2) / 2 : (easeOut!(x * 2 - 1) + 1) / 2
}

function _(
  easeIn: TimingFunction,
): [TimingFunction, TimingFunction, TimingFunction] {
  const easeOut: TimingFunction = invent(easeIn)
  const easeInOut: TimingFunction = solve(easeIn, easeOut)

  return [easeIn, easeOut, easeInOut]
}

export const linear: TimingFunction = x => x

const easeSine: TimingFunction = x => 1 - Math.cos((x * Math.PI) / 2)
export const [easeInSine, easeOutSine, easeInOutSine] = _(easeSine)

export const [easeInQuad, easeOutQuad, easeInOutQuad] = _(x => x ** 2)
export const [easeInCubic, easeOutCubic, easeInOutCubic] = _(x => x ** 3)
export const [easeInQuart, easeOutQuart, easeInOutQuart] = _(x => x ** 4)
export const [easeInQuint, easeOutQuint, easeInOutQuint] = _(x => x ** 5)

const easeExpo: TimingFunction = x => x || 2 ** (10 * x - 10)
const easeCirc: TimingFunction = x => 1 - Math.sqrt(1 - x ** 2)
const easeBack: TimingFunction = x => (c + 1) * x ** 3 - c * x ** 2
export const [easeInExpo, easeOutExpo, easeInOutExpo] = _(easeExpo)
export const [easeInCirc, easeOutCirc, easeInOutCirc] = _(easeCirc)
export const [easeInBack, easeOutBack, easeInOutBack] = _(easeBack)

const easeElastic: TimingFunction = x =>
  -Math.sin(((80 * x - 44.5) * Math.PI) / 9) * 2 ** (20 * x - 11)
export const easeInElastic: TimingFunction = x =>
  -Math.sin(((20 * x - 21.5) * Math.PI) / 3) * 2 ** (10 * x - 10)
export const easeOutElastic: TimingFunction = invent(easeInElastic)
export const easeInOutElastic: TimingFunction = solve(easeElastic)

export const easeBounce: TimingFunction = (x: number): number =>
  x < 1 / d
    ? n * x ** 2
    : x < 2 / d
      ? n * (x - 1.5 / d) ** 2 + 0.75
      : x < 2.5 / d
        ? n * (x - 2.25 / d) ** 2 + 0.9375
        : n * (x - 2.625 / d) ** 2 + 0.984_375
