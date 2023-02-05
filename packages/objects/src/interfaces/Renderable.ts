/**
 * A interface representing a Renderable object.
 */
export interface IRenderable {
  /*
   * Register a handler which will be called on each frame.
   * @param handler The handler. It will receive a number representing the order of the current frame.
   */
  onUpdate(handler: (frameNumber: number) => void): void;
}
