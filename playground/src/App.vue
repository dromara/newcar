<script setup lang="ts">
import { Download, Pause, Play, Settings, Share2, StepBack, StepForward } from 'lucide-vue-next'
import { onMounted, ref, watch } from 'vue'
import * as monaco from 'monaco-editor'
import { cn } from './lib/utils'
import { Button } from './components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './components/ui/command'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './components/ui/resizable'
import SettingDash from './components/SettingDash.vue'
import { init, process } from './process'

const versions = [
  { value: 'latest', label: 'Latest' },
]

const open = ref(false)
const value = ref('latest')

const editorElement = ref<HTMLDivElement>()

const codes
  = `// The default function needs getting two parameters
// @param nc all the exports functions, classes, etc of newcar.
// @param app the app instance
// You don't need to init the engine and play the animation,
// Newcar Playground will help you to do this work.
export default function (nc, app) {
  const scene = nc.createScene(
    new nc.Circle(100)
      .animate(nc.create().withAttr({ duration: 1 }))
  )
  app.checkout(scene)
}
`

const width = ref(window.innerWidth / 2)
const height = ref(width.value / 16 * 9)

const realWidth = ref(1600)
const realHeight = ref(900)

const status = ref<'play' | 'pause'>('pause')

const canvas = ref<HTMLCanvasElement>()

let back = () => { }
let forward = () => { }

const fps = ref<number>()
const elapsed = ref<number>()

let set: (skia: string) => void

onMounted(() => {
  const editor = monaco.editor.create(editorElement.value, {
    value: codes,
    language: 'javascript',
    automaticLayout: true,
    fontSize: 16,
  })

  function set(skia: string) {
    init(skia, canvas.value)
      .then((app) => {
        watch(status, (v) => {
          if (v === 'play') {
            process(editor.getValue(), app)
          }
        })
        back = () => {
          app.scene.elapsed -= 1
        }
        forward = () => {
          app.scene.elapsed += 1
        }
        setInterval(() => fps.value = app.reactiveFramePerSecond, 1000)
        setInterval(() => elapsed.value = app.scene.elapsed, 10)
      })
  }

  set('https://unpkg.com/canvaskit-wasm@latest/bin/canvaskit.wasm')
})
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="w-full h-12 border">
      <div class="float-left">
        <img class="w-12 h-12 p-2 float-left" src="./assets/newcar.webp">
        <span class="float-left font-thin text-2xl p-2">Newcar Playground</span>
      </div>
      <div class="float-right p-3">
        <SettingDash
          skia="https://unpkg.com/canvaskit-wasm@latest/bin/canvaskit.wasm" :width="1600" :height="900" :action="(skia, width, height) => {
            realWidth = width
            realHeight = height
            set(skia)
          }"
        >
          <Settings class="float-left w-6 h-6 mx-3 text-gray-500 hover:text-black" />
        </SettingDash>
        <Share2 class="float-left w-6 h-6 mx-3 text-gray-500 hover:text-black" />
        <Download class="float-left w-6 h-6 mx-3 text-gray-500 hover:text-black" />
        <Popover v-model:open="open">
          <PopoverTrigger as-child>
            <Button
              variant="outline" role="combobox" :aria-expanded="open"
              class="w-[200px] justify-between float-left mx-3 h-6"
            >
              {{ value
                ? versions.find((version) => version.value === value)?.label
                : "Select A Version" }}
              <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-[200px] p-0">
            <Command>
              <CommandInput class="h-9" placeholder="Search version..." />
              <CommandEmpty>No version found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="version in versions" :key="version.value" :value="version.value" @select="(ev) => {
                      if (typeof ev.detail.value === 'string') {
                        value = ev.detail.value
                      }
                      open = false
                    }"
                  >
                    {{ version.label }}
                    <CheckIcon
                      :class="cn(
                        'ml-auto h-4 w-4',
                        value === version.value ? 'opacity-100' : 'opacity-0',
                      )"
                    />
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
    <div class="flex flex-row w-full h-full">
      <div ref="editorElement" class="w-[50%] h-full" />
      <div class="w-[50%] h-full">
        <canvas
          ref="canvas" :width="realWidth" :height="realHeight" class="bg-black" :style="{
            width: `${width}px`,
            height: `${height}px`,
          }"
        />
        <div class="text-center pt-10 pb-5">
          <Button class="bg-white border hover:bg-gray-200" @click="back()">
            <StepBack class="text-gray-500" />
          </Button>
          <Button class="bg-white border hover:bg-gray-200">
            <Play v-if="status === 'pause'" class="text-gray-500" @click="status = 'play'" />
            <Pause v-else class="text-gray-500" @click="status = 'pause'" />
          </Button>
          <Button class="bg-white border hover:bg-gray-200" @click="forward()">
            <StepForward class="text-gray-500" />
          </Button>
        </div>
        <div>
          <ResizablePanelGroup direction="horizontal" class="h-full">
            <ResizablePanel>
              <div class="text-center">
                Info
              </div>
              <hr>
              <div class="float-left">
                <p>FPS: {{ fps }}</p>
                <p>ELAPSED: {{ elapsed }}</p>
              </div>
            </ResizablePanel>
            <ResizableHandle with-handle />
            <ResizablePanel>
              <div class="text-center">
                Options
              </div>
              <hr>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  </div>
</template>
