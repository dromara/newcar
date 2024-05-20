<script setup lang="ts">
import { CarEngine, Circle, Scene, Widget, create, easeBounce, easeInCirc, move } from 'newcar'
import type { App } from 'newcar'
import { onMounted, ref } from 'vue'

let app: App

const ncc1 = ref<HTMLCanvasElement>()

onMounted(() => {
  new CarEngine()
    .init('https://unpkg.com/canvaskit-wasm@latest/bin/canvaskit.wasm')
    .then((engine) => {
      if (ncc1.value) {
        app = engine.createApp(ncc1.value)
        const root = new Widget().add(
          new Circle(100, {
            x: 800,
            y: 450,
          })
            .animate(create, 0, 30, {
              by: easeInCirc,
            })
            .animate(move, 70, 100, {
              from: [800, 450],
              to: [800, 850],
              by: easeBounce,
            }),
        )
        const scene = new Scene(root)
        app.checkout(scene)
        app.config.unit = 'frame'
      }
    })
})
</script>

<template>
  <canvas
    id="canvas1"
    ref="ncc1"
    width="1600"
    height="900"
    style="width: 100%"
    @click="app.play"
  />
</template>
