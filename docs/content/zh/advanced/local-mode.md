---
title: 本地模式
---

# 本地模式

Newcar 只能在浏览器上运行吗？不仅仅！它也可以在 Node.js 上通过本地模式运行。

## 使用 ncli

首先，确保你的电脑上安装了 FFmpeg，然后使用以下命令安装 ncli：

```shell
$ npm install -g @newcar/cli
$ #or
$ npm i -g @newcar/cli
```

然后初始化引擎，并创建一个 `LocalApp`：

```javascript
// 初始化以及导入省略
const app = engine.createLocalApp(1600 /* 画布的宽 */, 900 /* 画布的高 */);
// 以下省略，注意，local 模式下没有 `play` 方法
```

最后，我们设置 `app` 为默认导出：

```javascript
export default app;
```

然后我们运行 `ncli` 命令：

```shell
$ ncli export input.js 200 output.mp4 --fps=60
```

- index.js：你的程序文件
- 200：录制的时长，以帧为单位
- output.mp4：输出的目录
- --fps=60：视频帧率
