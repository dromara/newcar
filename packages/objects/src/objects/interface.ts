export interface IPositioned {
  get x(): number;
  get y(): number;
}

export interface IPositionedMut extends IPositioned {
  set x(value: number);
  set y(value: number);
}

/**
 * A interface representing a fillable object.
 */
export interface IFillable {
  /**
   * Perform a fill.
   */
  fill(): void;
}

/**
 * A interface representing a object that can be filled partially.
 */
export interface IPartialFillable {
  /**
   * Perform a partial fill.
   * @param progress A number between 0 and 1 indicating the progress.
   */
  partialFill(progress: number): void;
}

/**
 * A interface representing a strokable object.
 */
export interface IStrokable {
  /**
   * Perform a stroke.
   */
  stroke(): void;
}

/**
 * A interface representing a object that can be stroked partially.
 */
export interface IPartialStrokable {
  /**
   * Perform a partial stroke.
   * @param progress A number between 0 and 1 indicating the progress.
   */
  partialStroke(progress: number): void;
}
