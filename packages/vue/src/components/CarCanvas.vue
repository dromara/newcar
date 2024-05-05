<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  width: Number,
  length: Number,
})
</script>

<template>
  <canvas :width="props.width" :height="props.length" />
</template>
