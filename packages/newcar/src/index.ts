import { Car } from "@newcar/core/src/car";
import { Scene } from "@newcar/core/src/scene";

export const createCar = (ele: HTMLCanvasElement): Car => new Car(ele);
export const createScene = (): Scene => new Scene();
