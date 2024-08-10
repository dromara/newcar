<template>
  <canvas ref="canvas" width="200" height="100"></canvas>
</template>

<script setup lang="ts">
import * as nc from 'newcar'
import { onMounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement>()

onMounted(async () => {
  const engine = await new nc.CarEngine().init('https://unpkg.com/canvaskit-wasm@latest/bin/canvaskit.wasm')
  const app = engine.createApp(canvas.value!).setBackgroundColor('transparent')
  const root = new nc.ComplexWidget([0, 0], [100, 100])
  .on('customEvent', (widget, x, y) => {
    console.log('Clicked!')
  })
  const scene = nc.createScene(root)
  app.checkout(scene)
  app.play()
})
</script>