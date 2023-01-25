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
