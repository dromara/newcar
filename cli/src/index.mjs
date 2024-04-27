#! /usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { execSync } from 'node:child_process'
import ffmpeg from 'fluent-ffmpeg'
import {
  Clerc,
  completionsPlugin,
  friendlyErrorPlugin,
  helpPlugin,
  notFoundPlugin,
  versionPlugin,
} from 'clerc'
import pkg from '../package.json' assert { type: 'json' }

export const main = Clerc.create()
  .name('Newcar Location Cli')
  .scriptName('ncli')
  .version(pkg.version)
  .description('The offical cli to build local app')
  .command('export', 'Export Newcar Animation to videos.', {
    parameters: ['<jsfile>', '<duration>', '<target>'],
    flags: {
      fps: {
        type: Number,
        default: 60,
        alias: 'f',
      },
    },
  })
  .on('export', (context) => {
    import(pathToFileURL(path.resolve(context.parameters.jsfile)).href).then(
      (module) => {
        const app = module.default
        const imagesArray = app.getFrames(context.parameters.duration)
        const tempFiles = imagesArray.map((uint8Array, index) => {
          const fileName = `temp_image_${index}.png`
          fs.writeFileSync(path.resolve(fileName), uint8Array)
          return fileName
        })
        ffmpeg()
          .on('error', (err) => {
            console.error(`An error occurred: ${err.message}`)
          })
          .on('end', () => {
            // eslint-disable-next-line no-console
            console.log('Processing finished !')
            // clear image files
            tempFiles.forEach((file) => fs.unlinkSync(file))
          })
          .input(path.resolve('./temp_image_%d.png'))
          .inputFPS(context.flags.fps)
          .output(path.resolve(context.parameters.target))
          .outputFPS(30)
          .run()
      },
    )
  })
  .command('create', 'Creating a local Newcar project.', {
    parameters: ['<name>'],
  })
  .on('create', (context) => {
    execSync(
      `git clone https://github.com/dromara/newcar-local-template.git ${context.parameters.name} --depth=1`,
    )
    fs.rmSync(path.resolve(context.parameters.name, '.git'), {
      recursive: true,
    })
  })
  .use(
    helpPlugin(),
    versionPlugin(),
    completionsPlugin(),
    friendlyErrorPlugin(),
    notFoundPlugin(),
  )
  .parse()
