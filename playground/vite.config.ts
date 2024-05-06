import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
})

module.exports = {
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({
        // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        languages: ['javascript', 'css', 'html', 'typescript', 'json'],
      }),
    ],
  },
}
