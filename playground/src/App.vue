<!-- eslint-disable no-eval -->
<!-- eslint-disable no-new -->
<script setup lang="ts">
import * as monaco from 'monaco-editor'
import type { Ref } from 'vue'
import { Suspense, onMounted, ref, watch } from 'vue'
import * as nc from 'newcar'

const width = ref(window.innerWidth / 2)
const height = ref(width.value / 16 * 9)

const isPause = ref(true)

const defaultCodes
= `function animate(nc, app) {
  const root = new nc.Circle(100).animate(nc.move, 0, 30, {
    to: [200, 300]
  })
  const scene = new nc.Scene(root)
  app.checkout(scene)
  return app
}
`

const canvas: Ref<HTMLCanvasElement | null> = ref(null)
const engine = new nc.CarEngine().init('https://unpkg.com/canvaskit-wasm@latest/bin/canvaskit.wasm')

onMounted(() => {
  const editor = monaco.editor.create(document.getElementById('editor')!, {
    value: defaultCodes,
    language: 'javascript',
    automaticLayout: true,
    theme: 'vs-dark',
    fontSize: 16,
  })
  const app = engine.then((e) => {
    return e.createApp(canvas.value!)
  })
  watch(isPause, (newvalue, _oldvalue) => {
    if (!newvalue) {
      app.then((a) => {
        (function (_nc, _app: nc.App) {
          eval(`(${editor.getValue()})(_nc, _app)`)
        })(nc, a)
        a.play()
      })
    }
    else {
      app.then((a) => {
        a.pause()
      })
    }
  })
  editor.onDidChangeModelContent((_event) => {
    isPause.value = true
  })
})
</script>

<template>
  <div class="fixed w-full h-full bg-gray-600" />
  <div class="sticky bg-gray-800 w-screen h-16">
    <ul>
      <li class="text-white m-3 text-center items-center text-3xl font-thin float-left select-none">
        Newcar Playground
      </li>
      <li class="text-white m-4 text-center items-center text-2xl font-thin float-right hover:text-sky-300 select-none">
        New +
      </li>
      <li class="text-white m-4 text-center items-center text-2xl font-thin float-right hover:text-sky-300 select-none">
        Settings <i class="fa fa-cogs" />
      </li>
    </ul>
  </div>
  <div class="float-left">
    <div id="editor" class="fixed w-[50%] h-full" />
    <Suspense>
      <canvas ref="canvas" class="fixed left-[50%] top-[4rem] bg-black" :width="width" :height="height" />
    </Suspense><div id="canvas" class="w-[50%] fixed bottom-[25%] text-center left-[50%]">
      <button class="scale-[2]">
        <i class="fa fa-backward text-white m-5 hover:text-sky-300" />
      </button>
      <button v-if="isPause" class="scale-[2]">
        <i class="fa fa-play text-white m-5 hover:text-sky-300" @click="isPause = false" />
      </button>
      <button v-else>
        <i class="fa fa-pause text-white m-5 hover:text-sky-300" @click="isPause = true" />
      </button>
      <button class="scale-[2]">
        <i class="fa fa-forward text-white m-5 hover:text-sky-300" />
      </button>
    </div>
  </div>
</template>
