<template>
  <canvas ref="canvas" width="200" height="300"></canvas>
</template>

<script setup lang="ts">
import * as nc from 'newcar'
import { onMounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement>()

onMounted(async () => {
  const engine = await new nc.CarEngine().init('https://unpkg.com/canvaskit-wasm@latest/bin/canvaskit.wasm')
  const app = engine.createApp(canvas.value!).setBackgroundColor('transparent')
  const root = new nc.Circle(100)
  .animate(
    nc.parallel(
      nc.create().withAttr({ duration: 1 }),
      nc.discolorate().withAttr({ duration: 1, to: Color.parse('skyblue') })
    )
  )
  const scene = nc.createScene(root)
  app.checkout(scene)
  app.play()
})
</script>