<template>
  <canvas
    ref="ncc1"
    width="1600"
    height="900"
    id="canvas1"
    style="width: 100%"
    @click="app.play"
  ></canvas>
</template>

<script setup lang="ts">
import { CarEngine, Scene, Widget, Circle, create, move, easeBounce, easeInCirc } from "newcar";
import type { App } from "newcar";
import { onMounted, ref } from "vue";

let app: App;

const ncc1 = ref<HTMLCanvasElement>();

onMounted(() => {
  new CarEngine()
    .init("https://unpkg.com/canvaskit-wasm@latest/bin/canvaskit.wasm")
    .then((engine) => {
      if (ncc1.value) {
        app = engine.createApp(ncc1.value);
        const root = new Widget().add(
          new Circle(100, {
            x: 800,
            y: 450
          })
            .animate(create, 0, 30, {
              by: easeInCirc
            })
            .animate(move, 70, 100, {
              from: [800, 450],
              to: [800, 850],
              by: easeBounce
            })
        );
        const scene = new Scene(root);
        app.checkout(scene);
      }
    });
});
</script>
