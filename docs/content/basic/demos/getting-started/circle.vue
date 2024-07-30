<template>
  <canvas ref="canvas" width="600" height="300"></canvas>
</template>

<script setup lang="ts">
import * as nc from 'newcar'
import { onMounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement>()

onMounted(async () => {
  const engine = await new nc.CarEngine().init('https://unpkg.com/canvaskit-wasm@latest/bin/canvaskit.wasm')
  const app = engine.createApp(canvas.value!).setBackgroundColor('transparent')
  const root = new nc.Circle(100, {
    x: 100,
    y: 100
  })
  const scene = nc.createScene(root)
  app.checkout(scene)
  app.play()
})
</script>