/* eslint-disable no-console */
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

  exportFile(resolve(output), tempFiles, fps)
}

async function resolveApp(path: string): Promise<App> {
  const app = (await import(pathToFileURL(resolve(path)).href)) as {
    default: App
  }
  return app.default
}

async function exportFile(outputPath: string, inputFiles: string[], fps: number) {
  // Create an array to store the promises returned by the FFmpeg process
  const promises = []

  // Iterate over the input files and push the FFmpeg promises to the array
  for (let i = 0; i < inputFiles.length; i++) {
    promises.push(
      new Promise((resolve, reject) => {
        ffmpeg(inputFiles[i])
          .on('error', (err: Error) => {
            console.error(`An error occurred: ${err.message}`)
            reject(err)
          })
          .inputFPS(fps)
          .output(outputPath) // Use the outputPath here
          .outputFPS(fps)
          .on('end', () => {
            console.log(`Frame ${i + 1} processed.`)
            fs.unlinkSync(inputFiles[i]) // Remove the original file
            resolve(null)
          })
          .run()
      }),
    )
  }

  // Wait for all FFmpeg processes to finish
  await Promise.all(promises)

  console.log('Processing finished!')
}
