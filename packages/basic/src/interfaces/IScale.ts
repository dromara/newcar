export interface IScale {
  get scaleX(): number;
  get scaleY(): number;
}

export interface IScaleMut extends IScale {
  set scaleX(value: number);
  set scaleY(value: number);
}
