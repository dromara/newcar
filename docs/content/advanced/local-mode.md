---
title: Local Mode
---

# Local Mode

Can Newcar only run in a browser? Not at all! It can also run on nodejs, which we call local mode!

## Using ncli

First, make sure that FFmpeg is installed on your computer, then use the following command to install ncli:

```shell
$ npm install -g @newcar/cli
$ #or
$ npm i -g @newcar/cli
```

Next, we initialize the engine and create a `LocalApp`:

```javascript
// Initialization and import are omitted
const app = engine.createLocalApp(1600 /* width of the canvas */, 900 /* height of the canvas */)
// The rest is omitted, remember, there is no `play` method in local mode
```

Finally, we set `app` as the default export:

```javascript
export default app
```

Then we run the `ncli` command:

```shell
$ ncli export input.js 200 output.mp4 --fps=60
```

- input.js: Your program file
- 200: The duration of the recording, in frames
- output.mp4: The output directory
- --fps=60: The frame rate of the video

And then you can find the directory where the video is located!
