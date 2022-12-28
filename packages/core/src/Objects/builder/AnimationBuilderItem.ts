import { AnimationBuilder } from "./AnimationBuilder";
import { Car } from "../../index";
export abstract class AnimationBuilderItem {
  /**
   * Will be called on registration.
   * @param parent The parent object.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRegister(_carInstance: Car): void {
    return;
  }

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
