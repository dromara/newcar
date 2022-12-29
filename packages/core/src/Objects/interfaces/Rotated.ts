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
