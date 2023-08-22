export interface ILimitofAxisX {
  get x_max(): number;
  set x_max(value: number);
  get x_min(): number;
  set x_min(value: number);
}

export interface ILimitofAxisY {
  get y_max(): number;
  set y_max(value: number);
  get y_min(): number;
  set y_min(value: number);
}

export interface ISystemDirection {
  get x_direction(): "left" | "right";
  set x_direction(value: "left" | "right");
  get y_direction(): "top" | "bottom";
  set y_direction(value: "top" | "bottom");
}
