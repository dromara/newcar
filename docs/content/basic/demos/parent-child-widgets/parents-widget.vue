<template>
  <canvas ref="canvas" width="606" height="606"></canvas>
</template>

<script setup lang="ts">
import * as nc from 'newcar'
import { onMounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement>()

onMounted(async () => {
  const engine = await new nc.CarEngine().init('https://unpkg.com/canvaskit-wasm@latest/bin/canvaskit.wasm')
  const app = engine.createApp(canvas.value!).setBackgroundColor('transparent')
  
  const child = new nc.Circle(100, {
  x: 103,
  y: 103,
  style:{
    border:true,
    borderColor:nc.Color.BLACK,
    borderWidth:3
  }
  })

  const father = new nc.Circle(300, {
    x: 303,
    y: 303,
    style:{
      border:true,
      borderColor:nc.Color.BLACK,
      borderWidth:3
    }
  })

  // Add child Widget
  father.add(child)

  const scene = nc.createScene(father)
  app.checkout(scene)
  app.play()
})
</script>