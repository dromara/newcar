export interface IScaled {
  get scaleX(): number;
  get scaleY(): number;
}

export interface IScaledMut extends IScaled {
  set scaleX(value: number);
  set scaleY(value: number);
}
