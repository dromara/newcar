import { AnimationBuilder } from "@newcar/animation-builder/src/index";
import { type AnimationBuilderItem } from "@newcar/animation-builder/src/item";
import { SoundBuilder } from "@newcar/sound-builder/src/index";
import { type Sound } from "@newcar/sound-builder/src/Sound";
import { Carobj } from "@newcar/objects/src/lib/carobj";
import { Core } from "@newcar/core/src/index";

export class Car {
  #animationBuilder: AnimationBuilder = new AnimationBuilder();
  #soundBuilder: SoundBuilder = new SoundBuilder();
  #core: Core;

  constructor(ele: HTMLCanvasElement, fps: number) {
    this.#core = new Core(ele, fps);
    return this;
  }

  addObject(obj: Carobj) {
    this.#core.linkObject(obj);
    return this;
  }

  addAnimationItem(animationItem: AnimationBuilderItem) {
    this.#animationBuilder.addItem(animationItem);
    return this;
  }

  addSoundItem(sound: Sound) {
    this.#soundBuilder.addRadio(sound);
    return this;
  }

  startPlay() {
    this.#animationBuilder.playOnCar(this.#core);
    this.#soundBuilder.playOnCar(this.#core);
    this.#core.startFrame();
  }

  onUpdate(command: (agr0: number) => void) {
    this.#core.onUpdate(command);
  }

  suspend(frame?: number) {
    this.#core.suspend(frame);
  }

  continue(frame?: number) {
    this.#core.continue(frame);
  }
}

window.onload = () => {
  console.log(
    `   ____  ___ _      ___________ ______
  / __ \\/ _ \\ | /| / / ___/ __  / ___/
 / / / /  __/ |/ |/ / /__/ /_/ / /    
/_/ /_/\\___/|__/|__/\\___/\\__,_/_/

%cThe animation is powered by %c newcar %c v0.2.0  %c

link: https://github.com/Bug-Duck/newcar
 `,
    "font-size: 14px",
    "background-color: orange; padding: 7px; font-size: 14px",
    "background-color: grey; padding: 7px; font-size: 14px"
  );
};

export { object } from "@newcar/objects";
export { animation } from "@newcar/animation-builder/src/builder_items/index";
export { interpolator } from "@newcar/animation-builder/src/interpolation/index";
export { Sound } from "@newcar/sound-builder/src/Sound";
