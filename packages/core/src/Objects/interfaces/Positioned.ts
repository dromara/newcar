export interface IPositioned {
  get x(): number;
  get y(): number;
}

export interface IPositionedMut extends IPositioned {
  set x(value: number);
  set y(value: number);
}
