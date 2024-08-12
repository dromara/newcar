<script setup lang="ts">
import * as nc from 'newcar'
import { onMounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement>()
let play:()=>void

onMounted(async () => {
  const engine = await new nc.CarEngine().init('https://unpkg.com/canvaskit-wasm@latest/bin/canvaskit.wasm')
  const app = engine.createApp(canvas.value!).setBackgroundColor('transparent')
  const root = new nc.Circle(100, {
      x: 103,
      y: 103,
      style:{
        border:true,
        borderColor:nc.Color.BLACK,
        borderWidth:3
      }
    }
  )
  const scene = nc.createScene(root)
  app.checkout(scene)
  app.play()
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
          nc.sequence(
            nc.create().withAttr({ duration: 5 }),
            nc.fadeIn().withAttr({ duration: 5 })
          ),
          // nc.discolorate().withAttr({ duration: 1, to: nc.Color.parse('skyblue') })
        )
      )
    const scene = nc.createScene(root)
    app.checkout(scene)
    app.play()
  }
})

</script>

<template>
  <button class="button" @click="play">run</button>
  <canvas ref="canvas" width="208" height="208"></canvas>
</template>

<style scoped>
.button {
  color: #ecf0f1;
  font-size: 17px;
  background-color: #e67e22;
  border: 1px solid #f39c12;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 6px 0px #d35400;
  transition: all 0.1s;
}

.button:active {
  box-shadow: 0px 2px 0px #d35400;
  position: relative;
  top: 2px;
}
</style>