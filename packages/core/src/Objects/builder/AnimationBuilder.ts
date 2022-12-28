import { AnimationBuilderItem } from "./AnimationBuilderItem";
import { Car } from '../../index';

export class AnimationBuilder {
  
  #items: AnimationBuilderItem[];

  // TODO: Implement this method.
  playOnCar(carInstance: Car) {
    this.#items.sort((a, b) => a.startFrame - b.startFrame);
    carInstance.forEvery(frame => {});
  }

}
