<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from './ui/dialog'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      www
    </DialogContent>
  </Dialog>
</template>
