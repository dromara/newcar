import type { IRendererController } from "@newcar/objects/src/interfaces/RenderController";
import type { IRenderable } from "@newcar/objects/src/interfaces/Renderable";

import type { IEventArgs } from "./EventArgs";
import type { EventHandler } from "./item";

export class EventBuilder<T extends IRenderable & IRendererController> {
  static MAX_EVENTS_AT_FRAME = 32;
  #handlers: Record<string, EventHandler<IEventArgs>>;
  #car: T;
  #eventQueue: IEventArgs[];

  constructor(car: T) {
    this.#car = car;
    this.#handlers = {};
    this.#eventQueue = [];
  }

  addEventListener<T extends IEventArgs>(eventType: string, handler: EventHandler<T>) {
    this.#handlers[eventType] = handler;
  }

  dispatchEvent<T extends IEventArgs>(args: T) {
    this.#eventQueue.push(args);
  }

  startLoop() {
    this.#car.onUpdate(() => {
      let counter = EventBuilder.MAX_EVENTS_AT_FRAME;
      while (this.#eventQueue.length > 0 && counter > 0) {
        counter -= 1;
        const args = this.#eventQueue.shift()!;
        this.#handlers[args.type()].on(args);
      }
    });
  }
}
