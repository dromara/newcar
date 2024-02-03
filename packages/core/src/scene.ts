import type { Car } from "./car";
import type { CarObject } from "./carobj";

export type UpdateFunction = (elapsed: number) => void;

export class Scene {
  elapsed = 0;
  objects: CarObject[] = [];
  updates: ((frame: number) => void)[] = [];
  car!: Car;

  constructor() {}

  add(...objects: CarObject[]): this {
    this.objects.push(...objects);

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
