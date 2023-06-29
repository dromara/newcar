import type { IRendererController } from "@newcar/objects/src/interfaces/RenderController";
import type { IRenderable } from "@newcar/objects/src/interfaces/Renderable";

import type { EventBuilderItem } from "./item";

export class EventBuilder {
  #events: EventBuilderItem[];

  playOnCar<T extends IRenderable & IRendererController>(rdInstance: T) {
    rdInstance.onUpdate(() => {});
  }
}
