export class Sound {
  #path: string | null = null;
  #startFrame: number | null = null;
  #length: number | null = null;
  #audio: HTMLAudioElement;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  #volume: number = 1;

  constructor(path: string, startFrame: number, endFrame?: number) {
    this.#path = path;
    this.#startFrame = startFrame;
    endFrame !== undefined ? (this.#length = endFrame - startFrame) : null;
    this.#audio = new Audio(this.#path);
    this.#audio.volume = this.#volume;
  }

  get path() {
    return this.#path;
  }

  get length() {
    return this.#length;
  }

  get startFrame() {
    return this.#startFrame;
  }

  get audio() {
    return this.#audio;
  }
}
