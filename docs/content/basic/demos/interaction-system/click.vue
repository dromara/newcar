<template>
  <canvas ref="canvas" width="106" height="106"></canvas>
</template>

<script setup lang="ts">
import * as nc from 'newcar'
import { onMounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement>()

onMounted(async () => {
  const engine = await new nc.CarEngine().init('https://unpkg.com/canvaskit-wasm@latest/bin/canvaskit.wasm')
  const app = engine.createApp(canvas.value!).setBackgroundColor('transparent')
  const root = new nc.Rect(100, 100,
  {
    x:3,
    y:3,
    style:{
      border:true,
      borderColor:nc.Color.BLACK,
      borderWidth:3
    }
  })
  .on(nc.click, (widget, x, y) => {
    console.log('Clicked!')
    alert("Clicked!")
  })
  const scene = nc.createScene(root)
  app.checkout(scene)
  app.play()
})
</script>