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
