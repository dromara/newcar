import { createCar, config, Scene, Arc, move } from "newcar";

config.canvaskitWasmFile = "../node_modules/canvaskit-wasm/bin/canvaskit.wasm";
const car = createCar("#canvas")

car.scene = new Scene().add(new Arc(100))
car.scene.update((frame) => {
  car.scene.objects[0].x = frame
  console.log("change")
})

car.on("ready-to-play", () => {
  car.play()
})