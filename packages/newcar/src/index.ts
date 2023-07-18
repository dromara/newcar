import { AnimationBuilder } from "@newcar/animation-builder/src/index";
import type { AnimationBuilderItem } from "@newcar/animation-builder/src/item";
import { Core } from "@newcar/core/src/index";
import type { Carobj } from "@newcar/objects/src/objects/carobj";
import { SoundBuilder } from "@newcar/sound-builder/src/index";
import type { AudioItem } from "@newcar/sound-builder/src/item";
import { exportAnimationToVideo } from "@newcar/export/src/index"

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

  addAnimationItem(builderItem: AnimationBuilderItem) {
    this.#animationBuilder.addItem(builderItem);

    return this;
  }

  animate(builderItem: AnimationBuilderItem) {
    this.#animationBuilder.animate(builderItem);

    return this;
  }

  addAudioItem(sound: AudioItem) {
    this.#soundBuilder.addAudio(sound);

    return this;
  }

  allowAudio() {
    this.#soundBuilder.allow();
  }

  banAudio() {
    this.#soundBuilder.ban();
  }

  play() {
    this.#animationBuilder.playOnCar(this.#core);
    this.#soundBuilder.playOnCar(this.#core);
    this.#core.CountFrame();
  }

  exports(startAt: number, lastAt: number, onFinish: (arg0: string) => void) {
    exportAnimationToVideo(this.#core, startAt, lastAt, onFinish);
  }

  onUpdate(command: (agr0: number) => void) {
    this.#core.onUpdate(command);
  }

  pause(frame?: number) {
    this.#core.pause(frame);
  }

  continue(frame?: number) {
    this.#core.continue(frame);
  }
}

window.onload = () => {
  // eslint-disable-next-line no-console
  console.log(
    `   ____  ___ _      ___________ ______
  / __ \\/ _ \\ | /| / / ___/ __  / ___/
 / / / /  __/ |/ |/ / /__/ /_/ / /    
/_/ /_/\\___/|__/|__/\\___/\\__,_/_/

%cThe animation is powered by %c newcar %c v0.3.1  %c

link: https://github.com/Bug-Duck/newcar

Click here to jump to our Twitter: https://twitter.com/bugduckteam
 `,
    "font-size: 14px",
    "background-color: orange; padding: 7px; font-size: 14px",
    "background-color: grey; padding: 7px; font-size: 14px",
  );
};

export { interpolator } from "@newcar/animation-builder/src/interpolation/index";
export { animation } from "@newcar/animation-builder/src/items";
export { object } from "@newcar/objects";
export { AudioItem } from "@newcar/sound-builder/src/item";
