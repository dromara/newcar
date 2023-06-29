import type { IRendererController } from "@newcar/objects/src/interfaces/RenderController";
import type { IRenderable } from "@newcar/objects/src/interfaces/Renderable";

import type { AnimationBuilder } from ".";

export abstract class AnimationBuilderItem {
  /**
   * Will be called on registration.
   * @param parent The parent object.
   */

  onRegister<T extends IRenderable & IRendererController>(_carInstance: T): void {}

  /**
   * Will be called on drawing frame.
   * @param relativeFrameCount The frame count relative to `fstart`.
   */
  abstract onDrawFrame(relativeFrameCount: number, parent: AnimationBuilder): void;

  /**
   * Decide when the animation starts.
   */
  abstract get startFrame(): number;

  /**
   * Decide how long the animation lasts.
   */
  abstract get length(): number;
}
