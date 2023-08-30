export interface ICircleAngle {
  get startAngle(): number;
  get endAngle(): number;
}

export interface ICircleAngleMut extends ICircleAngle {
  set startAngle(value: number);
  set endAngle(value: number);
}

export interface ICircleRadius {
  get radius(): number;
  set radius(value: number);
}
