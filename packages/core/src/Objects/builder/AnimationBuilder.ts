import { AnimationBuilderItem } from "./AnimationBuilderItem";
import { Car } from "../../index";
import { Carobj } from "..";

export class AnimationBuilder {
  #items: AnimationBuilderItem[] = [];
  #carobjs: Carobj[] = [];

  // TODO: Implemented, but not tested.
  playOnCar(carInstance: Car) {
    for (const i of this.#items) {
      i.onRegister(carInstance);
    }
    for (const i of this.#carobjs) {
      carInstance.linkObject(i);
    }
    const itemsClone = [...this.#items];
    itemsClone.sort((a, b) => a.startFrame - b.startFrame);
    carInstance.forEvery((frame) => {
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
    });
    carInstance.start();
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

  /**
   * Add an object to the animation.
   * @param obj The object.
   */
  addObject(obj: Carobj): AnimationBuilder {
    this.#carobjs.push(obj);
    return this;
  }
}
