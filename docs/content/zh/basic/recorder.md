---
title: 录制器
---

# Recorder

到目前为止，经过前面的学习，我相信您已经掌握了Newcar的基本用法。目前，如果您想向朋友展示你制作的动画或将其上传到社交媒体上，屏幕录制是一个不错的选择。但是，我们建议使用 `录制器` 来记录您的动画并以 `mp4` 或`webm`格式导出视频。

```javascript
// First, create a Recorder, specifying the Canvas Element type
const recorder = new Recorder(document.querySelector('#canvas'), 'mp4')

// Start recording
recorder.start(2000, (url) => {
  // After 2000ms, output the video's URL address
  console.log(url)
})
```

现在，您可以访问这个URL来下载视频。
