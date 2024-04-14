#! /usr/bin/env node

import { Clerc } from 'clerc'
import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'

const main = Clerc.create()
  .name('Newcar Location Cli')
  .scriptName('nc')
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

      // 使用fluent-ffmpeg将图片拼接成视频
      ffmpeg()
        .on('error', function (err) {
          console.error('An error occurred: ' + err.message)
        })
        .on('end', function () {
          console.log('Processing finished !')
          // 清理临时文件
          tempFiles.forEach((file) => fs.unlinkSync(file))
        })
        .input('temp_image_%d.png') // 输入文件名模式
        .inputFPS(context.flags.fps) // 这里的1是输入的帧率，根据需要调整
        .output(context.parameters.target) // 输出视频文件名
        .outputFPS(30) // 输出的帧率，根据需要调整
        .run()
    })
  })
  .parse()
