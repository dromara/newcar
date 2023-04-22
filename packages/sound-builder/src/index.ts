import { IRenderable } from "@newcar/objects/src/interfaces/Renderable";
import { IRendererController } from "@newcar/objects/src/interfaces/RenderController";
import { type AudioItem } from "./item";

export class SoundBuilder {
  /**
   * The first is the object AudioItem
   * The second is whether the audio is playing
   */
  #audioToPlay: [AudioItem, Boolean][] = [];
  #allowToPlay: Boolean = false;

  playOnCar<T extends IRenderable & IRendererController>(rdInstance: T) {
    rdInstance.onUpdate((curFrame) => {
      // Firstly, check the anthourity about Audio playing
      if (this.#allowToPlay) {
        this.#audioToPlay.forEach(audio => {
          // If The current time has passed the start time as the audio isn't be played 
          if (curFrame >= audio[0].startFrame! && !audio[1]) {
            audio[0].audio.play();
            //compute the time that it should be and jump to that time.
            audio[0].audio.currentTime = (curFrame - audio[0].startFrame!) / rdInstance.fps;
            audio[1] = true;
          }
        });
      }
    });
  }

  addAudio(audio: AudioItem) {
    this.#audioToPlay.push([audio, false]);
  }

  allow() {
    this.#allowToPlay = true;
  }

  ban() {
    this.#allowToPlay = false;
  }
}
