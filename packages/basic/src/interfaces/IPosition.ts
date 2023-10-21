export interface IPosition {
  get x(): number;
  get y(): number;
}

export interface IPositionMut extends IPosition {
  set x(value: number);
  set y(value: number);
}
