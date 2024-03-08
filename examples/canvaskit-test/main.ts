import { createCar, config, Scene, Arc, move } from "newcar";

config.canvaskitWasmFile = "../node_modules/canvaskit-wasm/bin/canvaskit.wasm";
const car = createCar("#canvas")

car.scene = new Scene().add(new Arc(100, {
  borderWidth: 20
}).animate(move, 100, {
  to: 600
})).add(new Arc(100, {
  borderWidth: 20
}).animate(move, 100, {
  to: 600
})).add(new Arc(100, {
  borderWidth: 20
}).animate(move, 100, {
  to: 600
})).add(new Arc(100, {
  borderWidth: 20
}).animate(move, 100, {
  to: 600
})).add(new Arc(100, {
  borderWidth: 20
}).animate(move, 100, {
  to: 600
})).add(new Arc(100, {
  borderWidth: 20
}).animate(move, 100, {
  to: 600
})).add(new Arc(100, {
  borderWidth: 20
}).animate(move, 100, {
  to: 600
})).add(new Arc(100, {
  borderWidth: 20
}).animate(move, 100, {
  to: 600
})).add(new Arc(100, {
  borderWidth: 20
}).animate(move, 100, {
  to: 600
})).add(new Arc(100, {
  borderWidth: 20
}).animate(move, 100, {
  to: 600
})).add(new Arc(100, {
  borderWidth: 20
}).animate(move, 100, {
  to: 600
})).add(new Arc(100, {
  borderWidth: 20
}).animate(move, 100, {
  to: 600
})).add(new Arc(100, {
  borderWidth: 20
}).animate(move, 100, {
  to: 600
})).add(new Arc(100, {
  borderWidth: 20
}).animate(move, 100, {
  to: 600
})).add(new Arc(100, {
  borderWidth: 20
}).animate(move, 100, {
  to: 600
})).add(new Arc(100, {
  borderWidth: 20
}).animate(move, 100, {
  to: 600
})).add(new Arc(100, {
  borderWidth: 20
}).animate(move, 100, {
  to: 600
})).add(new Arc(100, {
  borderWidth: 20
}).animate(move, 100, {
  to: 600
})).add(new Arc(100, {
  borderWidth: 20
}).animate(move, 100, {
  to: 600
})).add(new Arc(100, {
  borderWidth: 20
}).animate(move, 100, {
  to: 600
})).add(new Arc(100, {
  borderWidth: 20
}).animate(move, 100, {
  to: 600
})).add(new Arc(100, {
  borderWidth: 20
}).animate(move, 100, {
  to: 600
})).add(new Arc(100, {
  borderWidth: 20
}).animate(move, 100, {
  to: 600
})).add(new Arc(100, {
  borderWidth: 20,
  x: 100
}).animate(move, 100, {
  to: 600
})).add(new Arc(100, {
  borderWidth: 20
}).animate(move, 100, {
  to: 600
}))

car.on("ready-to-play", () => {
  car.play()
})