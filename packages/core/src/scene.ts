import type { Carobj } from "@newcar/basic/src/objects";

export type UpdateFunction = (elapsed: number) => void;

export class Scene {
  elapsed = 0;

  constructor(
    public objects: Carobj[] = [],
    public updates: UpdateFunction[] = [],
  ) {}

  add(object: Carobj): void {
    this.objects.push(object);
  }

  setUpdate(update: UpdateFunction): void {
    this.updates.push(update);
  }
}
