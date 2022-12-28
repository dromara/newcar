import { AnimationBuilderItem } from "./AnimationBuilderItem";
import { Car } from '../../index';

export class AnimationBuilder {
  
  #items: AnimationBuilderItem[];

  // TODO: Implemented, but not tested.
  playOnCar(carInstance: Car) {
    let itemsClone = [...this.#items];
    itemsClone.sort((a, b) => a.startFrame - b.startFrame);
    carInstance.forEvery(frame => {
      let sliceCounter = 0;
      for (let i of itemsClone) {
        
        // Now hold on.
        // This is a very simple algorithm.
        // If you can't understand it, you are just fool.
        // If you can understand it, you are fool, too.
        //                                      ---- 27Onion
        if (frame >= i.startFrame + i.length) {
          // Out-dated.
          sliceCounter++;
          continue;
        }

        if (frame < i.startFrame) {
          // You are not old enough to join this *activity*, bro
          break;
        }

        // M⚡️U⚡️L⚡️T⚡️I⚡️P⚡️L⚡️A⚡️Y⚡️E⚡️R⚡️-⚡️S⚡️P⚡️O⚡️R⚡️T⚡️S
        i.onDrawFrame(frame - i.startFrame, this);

      }
      itemsClone.slice(sliceCounter);
    });
  }

  /**
   * Add an animation builder iteme
   * @param builderItem The builder item.
   * @returns The reference to the builder itself.
   */
  addItem(builderItem: AnimationBuilderItem) : AnimationBuilder {
    this.#items.push(builderItem);
    return this;
  }

}
