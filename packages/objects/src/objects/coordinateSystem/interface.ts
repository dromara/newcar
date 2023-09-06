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
  get directionX(): "left" | "right";
  set directionX(value: "left" | "right");
  get directionY(): "top" | "bottom";
  set directionY(value: "top" | "bottom");
}
