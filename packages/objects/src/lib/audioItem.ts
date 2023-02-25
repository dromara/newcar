import { Carobj } from "./carobj";

export class AudioItem extends Carobj {
  #src: string | null = null;
  #audio: HTMLAudioElement;

  constructor(datas: { src: string; start: number }) {
    super();
    this.#src = datas.src;
    if (this.#src === null) throw new Error("Unknown audio!");
    this.#audio = new Audio(this.#src);
  }

  play() {
    this.#audio.play();
  }

  get src() {
    return this.#src;
  }

  get audio() {
    return this.#audio;
  }
}
