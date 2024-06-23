<script setup lang="ts">
import { Download, Pause, Play, Settings, Share2 } from 'lucide-vue-next'
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
import SettingDash from './components/SettingDash.vue'
import { init, process } from './process'

const versions = [
  { value: 'latest', label: 'Latest' },
]

const open = ref(false)
const value = ref('latest')

const editorElement = ref<HTMLDivElement>()

const codes
  = `export default function (nc, app) {
  const scene = nc.createScene(
    new nc.Circle(100)
      .animate(nc.create().withAttr({ duration: 1 }))
  )
}
`

const width = ref(window.innerWidth / 2)
const height = ref(width.value / 16 * 9)

const status = ref<'play' | 'pause'>('pause')

const canvas = ref<HTMLCanvasElement>()

onMounted(() => {
  const editor = monaco.editor.create(editorElement.value, {
    value: codes,
    language: 'javascript',
    automaticLayout: true,
    fontSize: 16,
  })

  init('https://unpkg.com/canvaskit-wasm@latest/bin/canvaskit.wasm', canvas.value)
    .then((app) => {
      watch(status, (v) => {
        if (v === 'play') {
          process(editor.getValue(), app)
        }
      })
    })
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
        <SettingDash>
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
          ref="canvas" width="1600" height="900" class="bg-black" :style="{
            width: `${width}px`,
            height: `${height}px`,
          }"
        />
        <div class="text-center pt-10">
          <Button class="bg-white border hover:bg-gray-200">
            <Play v-if="status === 'pause'" class="text-gray-500" @click="status = 'play'" />
            <Pause v-else class="text-gray-500" @click="status = 'pause'" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
