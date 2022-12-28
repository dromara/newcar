import { Car } from "src";
import { AnimationBuilder } from "./AnimationBuilder";
import { AnimationBuilderItem } from "./AnimationBuilderItem";

export class MutateContent extends AnimationBuilderItem {
  #start = 0;

  constructor() {
    #start = 0;
  }

  onRegister(carInstance: Car): void {
    throw new Error("Method not implemented.");
  }
  onDrawFrame(relativeFrameCount: number, parent: AnimationBuilder): void {
    throw new Error("Method not implemented.");
  }
  get startFrame(): number {
    throw new Error("Method not implemented.");
  }
  get length(): number {
    return 1;
  }
}
