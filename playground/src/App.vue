<!-- eslint-disable no-eval -->
<!-- eslint-disable no-new -->
<script setup lang="ts">
import * as monaco from 'monaco-editor'
import type { Ref } from 'vue'
import { onMounted, ref, watch } from 'vue'
import * as nc from 'newcar'
import writeText from 'clipboard-copy'

const width = ref(window.innerWidth / 2)
const height = ref(width.value / 16 * 9)

const isPause = ref(true)

const settingsIsDisplay = ref(false)

const paramsStr = window.location.search
const params = new URLSearchParams(paramsStr)
const codes = params.get('codes')

const canvaskit = defineModel()
canvaskit.value = 'https://unpkg.com/canvaskit-wasm@latest/bin/canvaskit.wasm'
const canvaskitFileIsChanged = ref(false)

const errorMessage = ref('')

const code = ref(
`const root = new nc.Circle(100).animate(nc.move, 0, 30, {
  to: [200, 300]
})
const scene = new nc.Scene(root)
app.checkout(scene)
return app
`,
)
const defaultCodes
= codes ?? code.value

const canvas: Ref<HTMLCanvasElement | null> = ref(null)
const share: Ref<HTMLElement | null> = ref(null)

onMounted(async () => {
  const editor = monaco.editor.create(document.getElementById('editor')!, {
    value: defaultCodes,
    language: 'javascript',
    automaticLayout: true,
    theme: 'vs-dark',
    fontSize: 16,
  })
  let engine = await new nc.CarEngine().init(canvaskit.value as string)
  let app = engine.createApp(canvas.value!)
  watch(isPause, (newvalue, _oldvalue) => {
    if (!newvalue) {
      // eslint-disable-next-line no-new-func
      new Function('nc', 'app', editor.getValue())(nc, app)
      app.play()
    }
    else {
      app.pause()
    }
  })
  watch(canvaskit, (newvalue, _oldvalue) => {
    if (canvaskit.value !== newvalue)
      canvaskitFileIsChanged.value = true
  })
  watch(canvaskitFileIsChanged, async (newvalue, _oldvalue) => {
    if (newvalue) {
      try {
        engine = await new nc.CarEngine().init(canvaskit.value as string)
      }
      catch (error) {
        errorMessage.value = error
      }
      app = engine.createApp(canvas.value!)
      canvaskitFileIsChanged.value = false
    }
  })
  editor.onDidChangeModelContent((_event) => {
    isPause.value = true
  })
  share.value!.onclick = () => {
    writeText(`https://playground.newcarjs.org/?codes=${encodeURI(editor.getValue())}`).then(() => {
      // eslint-disable-next-line no-alert
      window.alert('Shared link has been copied!')
    })
  }
})
</script>

<template>
  <div class="fixed w-full h-full bg-gray-600" />
  <div class="sticky bg-gray-800 w-screen h-16">
    <ul>
      <li class="text-white m-3 text-center items-center text-3xl font-thin float-left select-none">
        Newcar Playground
      </li>
      <li ref="share" class="text-white m-4 text-center items-center text-2xl font-thin float-right hover:text-sky-300 select-none">
        Share <i class="fa fa-share" />
      </li>
      <li class="text-white m-4 text-center items-center text-2xl font-thin float-right hover:text-sky-300 select-none" @click="settingsIsDisplay = true">
        Settings <i class="fa fa-cogs" />
      </li>
    </ul>
  </div>
  <div class="float-left">
    <div id="editor" class="fixed w-[50%] h-full" />
    <canvas ref="canvas" class="fixed left-[50%] top-[4rem] bg-black" :width="width" :height="height" />
    <div id="canvas" class="w-[50%] fixed bottom-[25%] text-center left-[50%]">
      <button class="scale-[2]">
        <i class="fa fa-backward text-white m-5 hover:text-sky-300" />
      </button>
      <button v-if="isPause" class="scale-[2]">
        <i class="fa fa-play text-white m-5 hover:text-sky-300" @click="isPause = false" />
      </button>
      <button v-else class="scale-[2]">
        <i class="fa fa-pause text-white m-5 hover:text-sky-300" @click="isPause = true" />
      </button>
      <button class="scale-[2]">
        <i class="fa fa-forward text-white m-5 hover:text-sky-300" />
      </button>
    </div>
  </div>
  <template v-if="settingsIsDisplay">
    <div class="fixed top-[15%] w-[70%] h-[70%] left-[15%] bg-gray-600 border border-gray-300">
      <div class="w-full bg-gray-800 h-8">
        <div class="float-right py-[0.2] px-3 text-white text-2xl hover:text-sky-300 select-none" @click="settingsIsDisplay = false">
          x
        </div>
      </div>
      <div class="text-center m-28">
        <div class="py-6 text-red-600 text-center">
          {{ errorMessage }}
        </div>
        <ul class="text-white px-[100px]">
          <li class="py-6">
            <div class="float-left">
              File <span class="bg-gray-800 rounded-md"><span class="m-1">canvaskit.wasm</span></span> Path
            </div>
          </li>
          <li class="pb-20">
            <input v-model="canvaskit" class="float-left bg-gray-800 rounded-xl h-8 w-64">
            <button class="float-right bg-sky-300 rounded-xl h-8 w-32" @click="canvaskitFileIsChanged = true">
              Yes
            </button>
          </li>
        </ul>
      </div>
    </div>
  </template>
</template>
