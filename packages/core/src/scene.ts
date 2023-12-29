import type { Carobj } from "@newcar/basic";

export type UpdateFunction = (elapsed: number) => void;

export class Scene {
  elapsed = 0;

  constructor(
    public objects: Carobj[] = [],
    public updates: UpdateFunction[] = [],
  ) {}

  add(...objects: Carobj[]): this {
    this.objects.push(...objects);

    return this;
  }

  update(update: UpdateFunction): this {
    this.updates.push(update);

    return this;
  }

  setup(setup: () => Promise<void>) {
    setup();
  }
}
