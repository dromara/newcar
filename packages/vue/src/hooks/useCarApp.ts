// import type { App, Scene } from '@newcar/core'
// import { type Ref, onMounted, ref } from './hooks'

// export function useCarApp(scene: Scene) {
//   const canvas: Ref<HTMLCanvasElement> = ref(null)
//   let app: App
//   onMounted(() => {
//     if (typeof $carengine !== 'undefined') {
//       app = $carengine.createApp(canvas.value)
//       app.checkout(scene)
//     }
//     else {
//       console.warn('[Newcar Warn] Newcar Plugin For Vue is not installed, please refer to')
//     }
//   })
//   return {
//     canvas,
//     app,
//   }
// }
