import type { Carobj } from "@newcar/basic/src/objects";

export type UpdateFunction = (elapsed: number) => void;

export class Scene {
  elapsed = 0;

  constructor(
    public objects: Carobj[] = [],
    public updates: UpdateFunction[] = [],
  ) {}

  add(object: Carobj): this {
    this.objects.push(object);

    return this;
  }

  update(update: UpdateFunction): this {
    this.updates.push(update);

    return this;
  }
}
