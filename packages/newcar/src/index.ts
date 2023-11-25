/* eslint-disable no-console */
import { Car } from "@newcar/core/src/car";
import { Scene } from "@newcar/core/src/scene";

export const createCar = (ele: HTMLCanvasElement): Car => new Car(ele);
export const createScene = (): Scene => new Scene();

export * from "@newcar/basic/src";
export * from "@newcar/utils/src";

console.log(
  `   ____  ___ _      ___________ ______
  / __ \\/ _ \\ | /| / / ___/ __  / ___/
 / / / /  __/ |/ |/ / /__/ /_/ / /    
/_/ /_/\\___/|__/|__/\\___/\\__,_/_/

%cThe animation is powered by %c newcar %c v0.4.0 %c

link: https://github.com/Bug-Duck/newcar

Click here to jump to our Twitter: https://twitter.com/bugduckteam
 `,
  "font-size: 14px",
  "background-color: orange; padding: 7px; font-size: 14px",
  "background-color: grey; padding: 7px; font-size: 14px",
  ""
);
