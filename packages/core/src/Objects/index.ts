export class Carobj {
  display = true; // The Object is or isnot display.
  #x: number = NaN;
  #y: number = NaN;
  #survival: boolean = false;
  /**
   * To channel the main program to draw the object.
   * @param ctx the context of the canvas object.
   */
  #draway(ctx: CanvasRenderingContext2D) {
    return ctx;
  }

  /**
   * Set the display to false.
   */
  hide() {
    this.display = false;
  }

  /**
   * Set the display to true.
   */
  appear() {
    this.display = true;
  }
  
  killed() {
    this.#survival = false;
  }

  lived() {
    this.#survival = true;
  }

  get lifeStatus () {
    return this.#survival;
  }

  get draway() {
    return this.#draway;
  }

  /**
   * Each Carobjs has different sighs.
   * @return The Carobj's type,one and only.
   */
  get sigh() {
    return "CarObject";
  }

  get x () {
    return this.#x;
  }
  set x (value: number) {
    this.#x = value;
  }

  get y () {
    return this.#y;
  }

  set y (value: number) {
    this.#y = value;
  }
}
