<script setup lang="ts">
import { defineProps, ref } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'

const props = defineProps<{
  skia: string
  width: number
  height: number
  action: (skia: string, width: number, height: number) => void
}>()

const skia = ref<string>(props.skia)
const width = ref<string>(props.width.toString())
const height = ref<string>(props.height.toString())
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <div class="mx-5 flex flex-col gap-5">
        <div class="py-1 flex flex-col">
          Skia (CanvasKit-WASM) location: <Input v-model="skia" />
        </div>
        <div class="py-1">
          Width: <Input v-model="width" />
        </div>
        <div class="py-1 flex flex-col">
          Height: <Input v-model="height" />
        </div>
      </div>
      <div class="text-center">
        <Button @click="props.action(skia, Number(width), Number(height))">
          Submit
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
