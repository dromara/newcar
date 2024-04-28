import fs from 'node:fs'
import { Buffer } from 'node:buffer'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

// @ts-expect-error fluent-ffmpeg is not typed
import ffmpeg from 'fluent-ffmpeg/lib/fluent-ffmpeg.js'

import type { LocalApp as App } from '@newcar/core'

export default async function build(input: string, duration: string | number, target: string, options: Record<string, string>) {
  const app = await resolveApp(input)

  duration = Number(duration)
  const [output, fps] = [
    target as string,
    Number(options.fps),
  ]

  const imagesArray = app.getFrames(duration)
  const tempFiles = imagesArray.map((content: Uint8Array | null, index) => {
    const fileName = `temp_image_${index}.png`
    if (content)
      fs.writeFileSync(resolve(fileName), Buffer.from(content))
    return fileName
  })

  exportFile(pathToFileURL(resolve(output)).href, tempFiles, fps)
}

async function resolveApp(path: string): Promise<App> {
  const app = (await import(pathToFileURL(resolve(path)).href)) as {
    default: App
  }
  return app.default
}

async function exportFile(path: string, files: string[], fps: number) {
  ffmpeg()
    .on('error', (err: Error) => {
      console.error(`An error occurred: ${err.message}`)
    })
    .on('end', () => {
      // eslint-disable-next-line no-console
      console.log('Processing finished!')
      // clear image files
      files.forEach(file => fs.unlinkSync(file))
    })
    .input(resolve('./temp_image_%d.png'))
    .inputFPS(fps)
    .output(path)
    .outputFPS(30)
    .run()
}
