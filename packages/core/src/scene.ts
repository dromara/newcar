import type { Carobj } from "@newcar/basic/src/objects";

export type UpdateFunction = (currentFrame: number) => void;

export class Scene {
  currentFrame = 0;

  constructor(
    public objects: Carobj[] = [],
    public updates: UpdateFunction[] = [],
  ) {}

  add(object: Carobj): void {
    this.objects.push(object);
  }

  onUpdate(update: UpdateFunction): void {
    this.updates.push(update);
  }
}
