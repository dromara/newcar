import type { IRenderable } from "./Renderable";

/**
 * An interface representing a renderer controler.
 */
export interface IRendererController extends IRenderable {
  /**
   * Add an object to the renderer.
   * @param obj The object.
   */
  linkObject(obj: unknown): void;
  /**
   * Start rendering.
   */
  beginCountFrame(): void;
  continue(frame: number): void;
  suspend(frame: number): void;

  get fps(): number;
  get framePerSecond(): number;
  get element(): HTMLCanvasElement;
}
