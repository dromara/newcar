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

  setUpdate(update: UpdateFunction): this {
    this.updates.push(update);

    return this;
  }
}
