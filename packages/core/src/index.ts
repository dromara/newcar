import { AnimationBuilder } from "@newcar/animation-builder/src/AnimationBuilder";
import { type AnimationBuilderItem } from "@newcar/animation-builder/src/AnimationBuilderItem";
import { Carobj } from "@newcar/objects/src/lib/carobj";
import { dataSaver } from "./DataSaver";

export class Car {
  #animationBuilder: AnimationBuilder = new AnimationBuilder();
  #dataSaver: dataSaver;

  constructor(ele: HTMLCanvasElement, fps: number) {
    this.#dataSaver = new dataSaver(ele, fps);
    return this;
  }

  addObject(obj: Carobj) {
    this.#animationBuilder.addObject(obj);
    return this;
  }

  addAnimationItem(animationItem: AnimationBuilderItem) {
    this.#animationBuilder.addItem(animationItem);
    return this;
  }

  startPlay() {
    this.#animationBuilder.playOnCar(this.#dataSaver);
  }

  onUpdate(command: (agr0: number) => void) {
    this.#dataSaver.onUpdate(command);
  }

  suspend(frame?: number) {
    this.#dataSaver.suspend(frame);
  }

  continue(frame?: number) {
    this.#dataSaver.continue(frame);
  }
}

window.onload = () => {
  console.log(
    `   ____  ___ _      ___________ ______
  / __ \\/ _ \\ | /| / / ___/ __  / ___/
 / / / /  __/ |/ |/ / /__/ /_/ / /    
/_/ /_/\\___/|__/|__/\\___/\\__,_/_/

%cThe animation is powered by %c newcar %c v0.1.0  %c

link: https://github.com/Bug-Duck/newcar
 `,
    "font-size: 14px",
    "background-color: orange; padding: 7px",
    "background-color: grey; padding: 7px"
  );
};

export { object } from "@newcar/objects";
export { AnimationBuilder } from "@newcar/animation-builder/src/AnimationBuilder";
export { animation } from "@newcar/animation-builder/src/builder_items/index";
export { interpolator } from "@newcar/animation-builder/src/interpolation/index";
