import { AnimationBuilderItem } from "./item";
import { IRenderable } from "@newcar/objects/src/interfaces/Renderable";
import { IRendererController } from "@newcar/objects/src/interfaces/RenderController";

export class AnimationBuilder {
  #items: AnimationBuilderItem[] = [];
  #currentAnimateList: AnimationBuilderItem[] = [];

  /**
   * Play the animation on a `? extends IRenderable & IRendererController` instance.
   * @param rdInstance The `? extends IRenderable & IRendererController` instance.
   */
  playOnCar<T extends IRenderable & IRendererController>(rdInstance: T) {
    for (const i of this.#items) {
      i.onRegister(rdInstance);
    }
    const itemsClone = [...this.#items];
    itemsClone.sort((a, b) => a.startFrame - b.startFrame);
    rdInstance.onUpdate((frame) => {
      for (const i of itemsClone) {
        // Now hold on.
        // This is a very simple algorithm.
        // If you can't understand it, you are just fool.
        // If you can understand it, you are fool, too.
        //                                      ---- 27Onion
        if (i.length !== -1) {
          if (frame >= i.startFrame + i.length) {
            // Out-dated.
            continue;
          }
        }

        if (frame < i.startFrame) {
          // You are not old enough to join this *activity*, bro
          break;
        }

        // M⚡️U⚡️L⚡️T⚡️I⚡️P⚡️L⚡️A⚡️Y⚡️E⚡️R⚡️-⚡️S⚡️P⚡️O⚡️R⚡️T⚡️S
        i.onDrawFrame(frame - i.startFrame, this);
      }
      this.#currentAnimateList.forEach((builderItem) =>
        builderItem.onDrawFrame(frame - builderItem.startFrame, this)
      );
      this.#currentAnimateList = [];
    });
  }

  /**
   * Add an animation builder iteme
   * @param builderItem The builder item.
   * @returns The reference to the builder itself.
   */
  addItem(builderItem: AnimationBuilderItem): AnimationBuilder {
    this.#items.push(builderItem);
    return this;
  }

  animate(builderItem: AnimationBuilderItem): AnimationBuilder {
    this.#currentAnimateList.push(builderItem);
    return this;
  }
}
