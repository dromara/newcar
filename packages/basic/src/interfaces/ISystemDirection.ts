export interface ISystemDirection {
  get directionX(): "left" | "right";
  set directionX(value: "left" | "right");
  get directionY(): "top" | "bottom";
  set directionY(value: "top" | "bottom");
}
