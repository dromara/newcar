export interface IRotation {
  /**
   * Returns the rotation angle in radians.
   */
  get rotation(): number;
}

export interface IRotationMut extends IRotation {
  /**
   * Set the rotation angle in radians.
   */
  set rotation(value: number);
}
