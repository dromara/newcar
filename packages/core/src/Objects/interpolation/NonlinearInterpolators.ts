/* eslint-disable indent */
export function EaseInSineInterpolator(x: number): number {
  return 1 - Math.cos((x * Math.PI) / 2);
}

export function EaseOutSineInterpolator(x: number): number {
  return Math.sin((x * Math.PI) / 2);
}

export function EaseInOutSineInterpolator(x: number): number {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

export function EaseInQuadInterpolator(x: number): number {
  return x * x;
}

export function EaseOutQuadInterpolator(x: number): number {
  return 1 - (1 - x) * (1 - x);
}

export function EaseInOutQuadInterpolator(x: number): number {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}

export function EaseInCubicInterpolatorInterpolator(x: number): number {
  return x * x * x;
}

export function EaseOutCubicInterpolatorInterpolator(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

export function EaseInOutCubicInterpolator(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export function EaseInQuartInterpolator(x: number): number {
  return x * x * x * x;
}

export function EaseOutQuartInterpolator(x: number): number {
  return 1 - Math.pow(1 - x, 4);
}

export function EaseInOutQuartInterpolator(x: number): number {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}

export function EaseInQuintInterpolator(x: number): number {
  return x * x * x * x * x;
}

export function EaseOutQuintInterpolator(x: number): number {
  return 1 - Math.pow(1 - x, 5);
}

export function EaseInOutQuintInterpolator(x: number): number {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}

export function EaseInExpoInterpolator(x: number): number {
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
}

export function EaseOutExpoInterpolator(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

export function EaseInOutExpoInterpolator(x: number): number {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
}

export function EaseInCircInterpolator(x: number): number {
  return 1 - Math.sqrt(1 - Math.pow(x, 2));
}

export function EaseOutCircInterpolator(x: number): number {
  return Math.sqrt(1 - Math.pow(x - 1, 2));
}

export function EaseInOutCircInterpolator(x: number): number {
  return x < 0.5
    ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
    : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
}

export function EaseInBackInterpolator(x: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;

  return c3 * x * x * x - c1 * x * x;
}

export function EaseOutBackInterpolator(x: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;

  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

export function EaseInOutBackInterpolator(x: number): number {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;

  return x < 0.5
    ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
    : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}

export function EaseInElasticInterpolator(x: number): number {
  const c4 = (2 * Math.PI) / 3;

  return x === 0 ? 0 : x === 1 ? 1 : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
}

export function EaseOutElasticInterpolator(x: number): number {
  const c4 = (2 * Math.PI) / 3;

  return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}

export function EaseInOutElasticInterpolator(x: number): number {
  const c5 = (2 * Math.PI) / 4.5;

  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
    : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
}

export function EaseInBounceInterpolator(x: number): number {
  return 1 - EaseOutBounceInterpolator(1 - x);
}

export function EaseOutBounceInterpolator(x: number): number {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}

export function EaseInOutBounceInterpolator(x: number): number {
  return x < 0.5
    ? (1 - EaseOutBounceInterpolator(1 - 2 * x)) / 2
    : (1 + EaseOutBounceInterpolator(2 * x - 1)) / 2;
}
