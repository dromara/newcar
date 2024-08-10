<script setup lang="ts">
import * as nc from 'newcar'
import { onMounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement>()

async function create_app() {
  const engine = await new nc.CarEngine().init('https://unpkg.com/canvaskit-wasm@latest/bin/canvaskit.wasm')
  const app = engine.createApp(canvas.value!).setBackgroundColor('transparent')
  return app
}

const app = create_app()

onMounted(async () => {
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
          nc.create().withAttr({ duration: 0.5 }),
          nc.fadeIn().withAttr({ duration: 0.5 })
        ),
        // nc.discolorate().withAttr({ duration: 1, to: nc.Color.parse('skyblue') })
      )
    )
  const scene = nc.createScene(root)
    ; (await app).checkout(scene)
})
async function play() {
  (await app).play()
}
</script>

<template>
  <button @click="play()">run</button>
  <canvas ref="canvas" width="208" height="208"></canvas>
</template>