import { Car, Scene } from "@newcar/core";

export * from "@newcar/basic";
export * from "@newcar/recorder";
export * from "@newcar/utils";

export const createCar = (element: HTMLCanvasElement | string): Car =>
  new Car(
    typeof element === "string" ? document.querySelector(element)! : element,
    new Scene(),
  );

export { createCar as newcar };

export { Car, Scene };
