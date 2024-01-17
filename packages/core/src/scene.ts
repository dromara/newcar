import type { Carobj } from "@newcar/basic";

import type { Car } from "./car";

export type UpdateFunction = (elapsed: number) => void;

export class Scene {
  elapsed = 0;
  objects: Carobj[] = [];
  updates: ((frame: number) => void)[] = [];
  car: Car;

  constructor() {}

  add(...objects: Carobj[]): this {
    this.objects.push(...objects);
    for (const object of this.objects) {
      object.car = this.car;
    }

    return this;
  }

  update(update: UpdateFunction): this {
    this.updates.push(update);

    return this;
  }

  setup(setup: () => Promise<void>): this {
    setup();

    return this;
  }
}
