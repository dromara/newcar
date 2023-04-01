import { IRenderable } from "@newcar/objects/src/interfaces/Renderable";
import { IRendererController } from "@newcar/objects/src/interfaces/RenderController";
import { EventBuilderItem } from "./item";

export class EventBuilder {
  #events: EventBuilderItem[];

  playOnCar<T extends IRenderable & IRendererController>(rdInstance: T) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    rdInstance.onUpdate(() => {});
  }
}
