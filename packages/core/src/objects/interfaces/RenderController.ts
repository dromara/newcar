import { IRenderable } from "./Renderable";

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
  startFrame(): void;
}
