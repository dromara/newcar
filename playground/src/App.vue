<!-- eslint-disable no-new -->
<script setup lang="ts">
import * as monaco from 'monaco-editor'
import type { Ref } from 'vue'
import { onMounted, ref, watch } from 'vue'
import * as nc from 'newcar'

const width = ref(window.innerWidth / 2)
const height = ref(width.value / 16 * 9)

const isPause = ref(true)

const defaultCodes
= `function animate(nc, element) {
  return new nc.CarEngine()
    .init('https://unpkg.com/canvaskit-wasm@latest/bin/canvaskit.wasm')
    .then(engine => {
      const app = engine.createApp(element)
      const root = new nc.Circle(100)
      const scene = new nc.Scene(root)
      app.checkout(scene)
      app.play(0)
    })
}
`

const canvas: Ref<HTMLCanvasElement | null> = ref(null)

onMounted(() => {
  const editor = monaco.editor.create(document.getElementById('editor')!, {
    value: defaultCodes,
    language: 'javascript',
    automaticLayout: true,
    theme: 'vs-dark',
    fontSize: 16,
  })
  watch(isPause, (newvalue, _oldvalue) => {
    if (!newvalue) {
      (function (_nc: any, _element: HTMLCanvasElement) {
        // eslint-disable-next-line no-eval
        const app = eval(`(${editor.getValue()})(_nc, _element)`)
        app.then((a) => {
          editor.onDidChangeModelContent((_e) => {
            isPause.value = true
            a.pause(0)
          })
        })
      })(nc, canvas.value!)
    }
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
    <canvas ref="canvas" class="fixed left-[50%] top-[4rem] bg-black" :width="width" :height="height" />
    <div id="canvas" class="w-[50%] fixed bottom-[25%] text-center left-[50%]">
      <button><i class="fa fa-backward scale-[2] text-white px-5 hover:text-sky-300" /></button>
      <button>
        <i v-if="isPause" class="fa fa-play scale-[2] text-white px-5 hover:text-sky-300" @click="isPause = false" />
        <i v-else class="fa fa-pause scale-[2] text-white px-5 hover:text-sky-300" @click="isPause = true" />
      </button>
      <button><i class="fa fa-forward scale-[2] text-white px-5 hover:text-sky-300" /></button>
    </div>
  </div>
</template>
