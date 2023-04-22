export class AudioItem {
  #path: string | null = null;
  #startFrame: number | null = null;
  #audio: HTMLAudioElement;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  #volume: number = 1;

  constructor(path: string, startFrame: number, volume: number) {
    this.#path = path;
    this.#startFrame = startFrame;
    this.#audio = new Audio(this.#path);
    this.#volume = volume;
    this.#audio.volume = this.#volume;
  }

  get path() {
    return this.#path;
  }

  get startFrame() {
    return this.#startFrame;
  }

  get audio() {
    return this.#audio;
  }
}
