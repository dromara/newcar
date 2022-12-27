import { Spirit } from "./spirit";
import { Text } from "./text"

class Carobj {

  display: boolean   // The Object is or isnot display.
  
  /**
   * To channel the main program to draw the object.
   * @param ctx the context of the canvas object.
   */
  #draway (ctx: CanvasRenderingContext2D) {
    return ctx;
  }

  /**
   * Set the display to false.
   */
  hide () {
    this.display = false;
  }
  
  /**
   * Set the display to true.
   */
  appear () {
    this.display = true;
  }
  
  get draway () {
    return this.#draway;
  }

  /**
   * Each Carobjs has different sighs.
   * @return The Carobj's type,one and only.
   */
  get sigh () {
    return "CarObject"
  }
}

export {
  Carobj,
  Spirit,
  Text
}