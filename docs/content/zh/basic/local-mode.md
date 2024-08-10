---
title: 本地模式
---

# 本地模式

Newcar 只能在浏览器中运行吗？完全错误！它也可以运行在nodejs上，我们称其为运行在本地模式上！

## 使用 ncli

首先，请确保您的计算机上安装了 FFmpeg，然后使用以下命令安装 ncli：

```shell
$ npm install -g @newcar/cli
$ #or
$ npm i -g @newcar/cli
```

接下来，我们要初始化引擎并创建一个 `LocalApp`：

```javascript
// Initialization and import are omitted
const app = engine.createLocalApp(1600 /* width of the canvas */, 900 /* height of the canvas */)
// The rest is omitted, remember, there is no `play` method in local mode
```

最后，我们将 `app` 设置为默认导出：

```javascript
export default app
```

然后我们运行 `ncli` 命令：

```shell
$ ncli export input.js 200 output.mp4 --fps=60
```

- input.js: Your program file
- 200: The duration of the recording, in frames
- output.mp4: The output directory
- --fps=60: The frame rate of the video

然后你就可以在当前目录找到生成的视频！
