<template>
  <canvas ref="canvas" width="600" height="300"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as nc from 'newcar'

const canvas = ref<HTMLCanvasElement>()

onMounted(async () => {
  await nc.useFont('https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf')
  const engine = await new nc.CarEngine()
    .init('https://unpkg.com/canvaskit-wasm@latest/bin/canvaskit.wasm')
  const app = engine.createApp(canvas.value!).setBackgroundColor('transparent')

  const scene = nc.createScene(
    new nc.TextGroup([
      new nc.Text('Hello', {
        x: 100,
        y: 100,
        style: {
          fontSize: 50,
          fill: true
        }
      }),
      new nc.Text(' world!', {
        x: 100,
        y: 150,
        style: {
          fontSize: 20,
          fill: true,
        }
      }),
      // ...
    ], {
      width: 600,
      x: 200,
      y: 200
    })
  )

  app.checkout(scene)
  app.play()
})
</script>