import type { Carobj } from "@newcar/basic/src/objects";

type UpdateFunction = (currentFrame: number) => void;
export class Scene {
  currentFrame = 0;

  constructor(
    public updates: UpdateFunction[] = [],
    public objects: Carobj[] = [],
  ) {}
}
