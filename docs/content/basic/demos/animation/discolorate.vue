<script setup lang="ts">
import * as nc from 'newcar'
import { onMounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement>()
let play:()=>void

onMounted(async () => {
  const engine = await new nc.CarEngine().init('https://unpkg.com/canvaskit-wasm@latest/bin/canvaskit.wasm')
  const app = engine.createApp(canvas.value!).setBackgroundColor('transparent')

  play=()=> {
    const root = new nc.Circle(100, {
      x: 103,
      y: 103,
      style:{
        border:true,
        borderColor:nc.Color.BLACK,
        borderWidth:3
      }
    })
    .animate(
      nc.parallel(
        nc.create().withAttr({ duration: 10 }),
        // nc.discolorate().withAttr({ duration: 1, to: nc.Color.fromName('skyblue') })
      )
    )
    const scene = nc.createScene(root)
    app.checkout(scene)
    app.play()
  }
})

</script>

<template>
  <button class=button @click="play">run</button>
  <canvas ref="canvas" width="208" height="208"></canvas>
</template>