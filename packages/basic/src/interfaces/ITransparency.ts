export interface ITransparency {
  get transparency(): number;
}

export interface ITransparencyMut extends ITransparency {
  set transparency(value: number);
}
