/* eslint-disable no-console */
import fs from 'node:fs'
import { Buffer } from 'node:buffer'
import path from 'node:path'
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
      fs.writeFileSync(path.resolve(fileName), Buffer.from(content))
    return fileName
  })

  exportFile(path.resolve(output), tempFiles, fps)
}

async function resolveApp(_path: string): Promise<App> {
  const app = (await import(pathToFileURL(path.resolve(_path)).href)) as {
    default: App
  }
  return app.default
}

async function exportFile(outputPath: string, inputFiles: string[], fps: number) {
  await new Promise((resolve, reject) => {
    ffmpeg(path.join(path.dirname(inputFiles[0]), '/temp_image_%d.png'))
      .on('error', (err: Error) => {
        console.error(`An error occurred: ${err.message}`)
        reject(err)
      })
      .inputFPS(fps)
      .output(outputPath) // Use the outputPath here
      .outputFPS(fps)
      .on('end', () => {
        console.log(`Video generated.`)
        for (const file of inputFiles) {
          fs.unlinkSync(file)
        }
        resolve(null)
      })
      .run()
  })

  console.log('Processing finished!')
}
