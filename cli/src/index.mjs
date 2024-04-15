#! /usr/bin/env node

import {
  Clerc,
  helpPlugin,
  versionPlugin,
  completionsPlugin,
  friendlyErrorPlugin,
  notFoundPlugin,
} from 'clerc'
import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'

const main = Clerc.create()
  .name('Newcar Location Cli')
  .scriptName('ncli')
  .version('1.0.0')
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
    import(context.parameters.jsfile).then((module) => {
      const app = module.default
      const imagesArray = app.getFrames(context.parameters.duration)
      const tempFiles = imagesArray.map((uint8Array, index) => {
        const fileName = `temp_image_${index}.png`
        fs.writeFileSync(fileName, uint8Array)
        return fileName
      })
      ffmpeg()
        .on('error', function (err) {
          console.error('An error occurred: ' + err.message)
        })
        .on('end', function () {
          console.log('Processing finished !')
          // clear image files
          tempFiles.forEach((file) => fs.unlinkSync(file))
        })
        .input('temp_image_%d.png')
        .inputFPS(context.flags.fps)
        .output(context.parameters.target)
        .outputFPS(30)
        .run()
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
