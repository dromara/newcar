export function wait(value: number, unit?: 'frame' | 'second') {
  return {
    duration: value,
    unit,
    remaining: value,
  }
}
