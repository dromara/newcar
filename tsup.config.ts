import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm', 'iife'],
  tsconfig: '../../tsconfig.json',
  splitting: true,
  clean: true,
  dts: true,
})
