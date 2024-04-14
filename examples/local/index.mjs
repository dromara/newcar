import * as nc from 'newcar'
import fs from 'fs'
import { exec } from 'child_process'
import path from 'path'

new nc.CarEngine()
  .init('../node_modules/canvaskit-wasm/bin/canvaskit.wasm')
  .then((engine) => {

// 保存图片到文件的函数
function saveImageToFile(imageBuffer, filename, callback) {
  fs.writeFile(filename, imageBuffer, (err) => {
    if (err) {
      console.error('Error writing image to file:', err);
      callback(err);
      return;
    }
    console.log(`Saved image to ${filename}`);
    callback(null);
  });
}

// 图片存放的临时目录
const tempImagesDir = 'images';
// 确保目录存在
fs.mkdirSync(tempImagesDir, { recursive: true });
    const app = engine.createLocalApp(200, 300)
    const root = new nc.Circle(200).animate(nc.create, 0, 30)
    const scene = new nc.Scene(root)
    app.checkout(scene)
    const data = app.getFrames(30)
    Promise.all(data.map((imageBuffer, index) => {
      const filename = path.join(tempImagesDir, `img${String(index + 1).padStart(3, '0')}.jpg`);
      return new Promise((resolve, reject) => {
        saveImageToFile(imageBuffer, filename, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    })).then(() => {
      // 所有图片都已保存，现在使用FFmpeg创建视频
      const outputVideoPath = 'output.mp4';
      const ffmpegCommand = `ffmpeg -framerate 24 -i ${path.join(tempImagesDir, 'img%03d.jpg')} -c:v libx264 -pix_fmt yuv420p ${outputVideoPath}`;
    
      exec(ffmpegCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        
        console.log('Video created successfully');
    
        // 清理临时文件夹和图片文件（可选）
        fs.rmSync(tempImagesDir, { recursive: true, force: true });
      });
    }).catch((error) => {
      console.error('Failed to save images:', error);
    });
    console.log(data)
  })
