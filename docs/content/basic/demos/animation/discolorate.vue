<script setup lang="ts">
import * as nc from 'newcar'
import { onMounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement>()
const engine = await new nc.CarEngine().init('https://unpkg.com/canvaskit-wasm@latest/bin/canvaskit.wasm')
const app = engine.createApp(canvas.value!).setBackgroundColor('transparent')

onMounted(async () => {
  const root = new nc.Circle(100,{
    x:100,
    y:100
  })
  .animate(
    nc.parallel(
      nc.create().withAttr({ duration: 1 }),
      // nc.discolorate().withAttr({ duration: 1, to: nc.Color.parse('skyblue') })
    )
  )
  const scene = nc.createScene(root)
  app.checkout(scene)
  
})
function play(){
  app.play()
}
</script>

<template>
  <div class="div">
    <button calss="bottom" @click.once="play">play</button> 
    <canvas ref="canvas" width="200" height="300"></canvas>
  </div>
</template>

<style scoped lang="css">
  .div{
    
  }
</style>