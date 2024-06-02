/* eslint-disable import/no-mutable-exports */
import CanvasKitInit from 'canvaskit-wasm'
import { error } from '@newcar/utils'
import { defineCreateAppApi } from './app'

export let createApp: ReturnType<typeof defineCreateAppApi> = (() => {
  error('Please preload Skia before you use this API!')
}) as any

export async function loadSkia(wasm: string) {
  const ck = await CanvasKitInit({
    locateFile: (_file: string) => wasm,
  })

  createApp = defineCreateAppApi(ck) as ReturnType<typeof defineCreateAppApi>

  return ck
}
