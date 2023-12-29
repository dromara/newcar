import type { Carobj } from "@newcar/basic";
import * as core from "@newcar/core";

export * from "@newcar/basic";
export { Car, Scene } from "@newcar/core";
export * from "@newcar/recorder";
export * from "@newcar/utils";

export const newcar = (
  element: HTMLCanvasElement | string,
  sceneOrObjects?: core.Scene | Carobj[],
): core.Car =>
  new core.Car(
    typeof element === "string" ? document.querySelector(element)! : element,
    sceneOrObjects === undefined
      ? new core.Scene()
      : Array.isArray(sceneOrObjects)
      ? new core.Scene(sceneOrObjects)
      : sceneOrObjects,
  );

// eslint-disable-next-line no-console
console.log(
  `   ____  ___ _      ___________ ______
  / __ \\/ _ \\ | /| / / ___/ __  / ___/
 / / / /  __/ |/ |/ / /__/ /_/ / /    
/_/ /_/\\___/|__/|__/\\___/\\__,_/_/

%cThe animation is powered by %c newcar %c v0.6.0 %c

link: https://github.com/Bug-Duck/newcar

Click here to jump to our Twitter: https://twitter.com/bugduckteam
 `,
  "font-size: 14px",
  "background-color: orange; padding: 7px; font-size: 14px",
  "background-color: grey; padding: 7px; font-size: 14px",
  "",
);
