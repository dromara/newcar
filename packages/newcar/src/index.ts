import { Car } from "@newcar/core/src/car";
import { Scene } from "@newcar/core/src/scene";
import { Color } from "@newcar/utils/src/color";

export const createCar = (ele: HTMLCanvasElement): Car => new Car(ele);
export const createScene = (): Scene => new Scene();

export { Color };
