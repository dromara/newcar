import { createCar, config, Scene, Arc, move } from "newcar";

config.canvaskitWasmFile = "../node_modules/canvaskit-wasm/bin/canvaskit.wasm";
const car = createCar("#canvas")

car.scene = new Scene().add(new Arc(100, {
  start: 0,
  end: 100
}).animate(move, 600, {
  to: 300
}))
car.on("ready-to-play", () => {
  car.play()
});