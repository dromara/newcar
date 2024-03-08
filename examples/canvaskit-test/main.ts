import { createCar, config, Scene, Arc, move } from "newcar";

config.canvaskitWasmFile = "../node_modules/canvaskit-wasm/bin/canvaskit.wasm";

const car = createCar("#canvas")

car.scene = new Scene()
  .add(
    new Arc(100).animate(move, 100, {
      to: 100
    })
  )

car.on("ready-to-play", () => {
  car.play()
})