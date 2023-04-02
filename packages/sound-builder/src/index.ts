import { IRenderable } from "@newcar/objects/src/interfaces/Renderable";
import { IRendererController } from "@newcar/objects/src/interfaces/RenderController";
import { type Sound } from "./Sound";

export class SoundBuilder {
  #audioToPlay: Sound[] = [];

  playOnCar<T extends IRenderable & IRendererController>(rdInstance: T) {
    rdInstance.onUpdate((curFrame) => {
      this.#audioToPlay.forEach((audio) => {
        if (curFrame === audio.startFrame! + audio.length! || audio.length !== null) {
          console.log("pause!");
          audio.audio.pause();
        } else if (curFrame >= audio.startFrame!) {
          audio.audio.play();
        }
      });
    });
  }

  addRadio(sound: Sound) {
    this.#audioToPlay.push(sound);
  }
}
