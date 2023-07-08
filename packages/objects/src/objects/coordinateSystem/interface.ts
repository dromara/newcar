export interface ILengthofAxisX {
  get AxisXLength(): number;
  set AxisXLength(value: number);
}

export interface ILengthofAxisY {
  get AxisYLength(): number;
  set AxisYLength(value: number);
}

export interface ISystemDirection {
  get axisXDirection(): "left" | "right";
  get axisYDirection(): "top" | "bottom";
  set axisXDirection(value: "left" | "right");
  set axisYDirection(value: "top" | "bottom");
}

