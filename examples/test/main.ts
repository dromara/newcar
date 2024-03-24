import { CarEngine, Scene, Widget } from "@newcar/core";

new CarEngine().init('../node_modules/canvaskit-wasm/bin/canvaskit.wasm').then(engine => {
  const app = engine.createApp(document.querySelector('#canvas')).play()
  app.checkout(new Scene(new Widget()))
})