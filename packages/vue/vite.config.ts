import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  root: '.',
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'NewcarVue',
      formats: ['es', 'cjs'],
      fileName: 'newcar',
    },
    rollupOptions: {
      external: ['vue'],
    },
  },
  plugins: [
    vue(),
    dts({
      include: ['./src/**/*.ts'],
      rollupTypes: true,
      copyDtsFiles: true,
    }),
  ],
})
