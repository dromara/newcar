<script setup lang="ts">
import * as monaco from 'monaco-editor'
import { onMounted, ref } from 'vue'

const isPause = ref(true)

onMounted(() => {
  monaco.editor.create(document.getElementById('editor')!, {
    value:
`import * as nc from newcar
const engine = await new nc.CarEngine()
  .init('unpkg.com/canvaskit-wasm@latest/bin/canvaskit.wasm')
const app = engine.createApp(document.querySelector('#canvas'))
const root = new nc.Widget()
const scene = nc.createScene(root)
app.checkout(scene)
app.play()
`,
    language: 'javascript',
    automaticLayout: true,
    theme: 'vs-dark',
    fontSize: 20,
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
    <canvas id="canvas" class="w-[50%] h-[56.25%] fixed left-[50%] top-[4rem] bg-black" width="800" height="450" />
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
