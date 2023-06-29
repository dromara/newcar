export interface IRotated {
  /**
   * Returns the rotation angle in radians.
   */
  get rotation(): number;
}

export interface IRotatedMut extends IRotated {
  /**
   * Set the rotation angle in radians.
   */
  set rotation(value: number);
}

export interface IScaled {
  get scaleX(): number;
  get scaleY(): number;
}

export interface IScaledMut extends IScaled {
  set scaleX(value: number);
  set scaleY(value: number);
}
