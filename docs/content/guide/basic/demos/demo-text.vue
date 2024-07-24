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
    new nc.Text('Hello world!', {
      x: 100,
      y: 100,
      style: {
        fillColor: nc.Color.parse('red'),
        fontSize: 50
      }
    })
  )

  app.checkout(scene)
  app.play()
})
</script>